using MDB.DAL;
using MDB.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using static MDB.DAL.ApiClasses;

namespace MDB.Api.Controllers
{
    public class MoviesController : ApiController
    {
        private MdbContext db = new MdbContext();
        // GET: api/Movies
        public IQueryable<MovieApi> GetAll()
        {
            return db.Movies
              .Select(movie => new MovieApi
              {
                  MovieID = movie.MovieID,
                  Image = movie.Image,
                  Title = movie.Title,
                  Year = movie.Year,
                  Description = movie.Description,
                  Tags = movie.Tags.Select(tag => tag.Name)
              });
        }

        // GET: api/Movies/GetId/1
        public MovieApi GetId(int? id)
        {
            if (id == null)
            {
                return null;
            }

            Movie movie = db.Movies.Find(id);

            if (movie == null)
            {
                return null;
            }

            return new MovieApi
            {
                MovieID = movie.MovieID,
                Image = movie.Image,
                Title = movie.Title,
                Year = movie.Year,
                Description = movie.Description,
                Tags = movie.Tags.Select(tag => tag.Name),
                Director = movie.Director.PersonID,
                Screenwriter = movie.Screenwriter.PersonID,
                Actors = movie.Actors.Select(actor => actor.PersonID)
            };
        }

        [System.Web.Http.HttpPost]
        // POST: api/Movies/Edit/2
        public HttpStatusCodeResult Edit(int? id, [Bind(Include = "Title,Year,Description,Tags,Director,Screenwriter,Actors")] MovieApi movieApi)
        {
            if (id == null || movieApi == null || User.Identity.GetUserId() == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Movie movie = db.Movies.Find(id);

            if (movie == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.NotFound);
            }

            if (ModelState.IsValid)
            {
                var removeTags = new List<Tag>();
                var notAddTags = new List<TagEnum>();

                var removeActors = new List<Actor>();
                var notAddActors = new List<int>();

                movie.Title = movieApi.Title;
                movie.Description = movieApi.Description;
                movie.Year = movieApi.Year;

                movie.Director = db.Directors.Find(movieApi.Director);
                movie.Screenwriter = db.Screenwriters.Find(movieApi.Screenwriter);

                foreach (var tag in movie.Tags)
                {
                    if (movieApi.Tags.Contains(tag.Name))
                        notAddTags.Add(tag.Name);
                    else
                        removeTags.Add(tag);
                }

                foreach (var tag in removeTags)
                {
                    movie.Tags.Remove(tag);
                }

                foreach (var tag in movieApi.Tags)
                {
                    if (!notAddTags.Contains(tag))
                        movie.Tags.Add(new Tag { Name = tag });
                }

                foreach (var actor in movie.Actors)
                {
                    if (movieApi.Actors.Contains(actor.PersonID))
                        notAddActors.Add(actor.PersonID);
                    else
                        removeActors.Add(actor);
                }

                foreach (var actor in removeActors)
                {
                    movie.Actors.Remove(actor);
                }

                foreach (var actor in movieApi.Actors)
                {
                    if (!notAddActors.Contains(actor))
                        movie.Actors.Add(db.Actors.Find(actor));
                }

                db.Entry(movie).State = EntityState.Modified;
                db.SaveChanges();
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }

            return new HttpStatusCodeResult(HttpStatusCode.Conflict);
        }

        [System.Web.Http.HttpPost]
        // POST: api/Movies/Create
        public HttpStatusCodeResult Create([Bind(Include = "Title,Year,Description,Tags,Director,Screenwriter,Actors")] MovieApi movieApi)
        {
            if (movieApi == null || User.Identity.GetUserId() == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            if (ModelState.IsValid)
            {
                Movie movie = new Movie();

                movie.Title = movieApi.Title;
                movie.Description = movieApi.Description;
                movie.Year = movieApi.Year;
                movie.Tags = new List<Tag>();
                movie.Actors = new List<Actor>();

                movie.Director = db.Directors.Find(movieApi.Director);
                movie.Screenwriter = db.Screenwriters.Find(movieApi.Screenwriter);


                foreach (var tag in movieApi.Tags)
                {
                    movie.Tags.Add(new Tag { Name = tag });
                }

                foreach (var actor in movieApi.Actors)
                {
                    movie.Actors.Add(db.Actors.Find(actor));
                }

                db.Movies.Add(movie);
                db.SaveChanges();
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }

            return new HttpStatusCodeResult(HttpStatusCode.Conflict);
        }

        [System.Web.Http.HttpGet]
        // GET: api/Movies/UserMovie/2
        public UserMovieApi UserMovie(int? id)
        {
            if (id == null)
            {
                return null;
            }
            Movie movie = db.Movies.Find(id);
            var userId = User.Identity.GetUserId();
            ApplicationUser currentUser = db.Users.Find(userId);
            if (currentUser == null || currentUser.UserMovies == null)
            {
                return null;
                //return new HttpResponseException(HttpStatusCode.NotFound);
            }
            if (movie == null)
            {
                return null;
            }
            var currentUserMovie = currentUser.UserMovies
                .Where((userMovie) => (userMovie.Movie == movie))
                .DefaultIfEmpty(null).First();
            if (currentUserMovie == null)
            {
                return new UserMovieApi()
                {
                    Rating = 0,
                    Category = 0,
                    AvgRating = movie.AverageRating
                };
            }
            return new UserMovieApi()
            {
                Rating = currentUserMovie.Rating,
                Category = (int)currentUserMovie.Category,
                AvgRating = movie.AverageRating
            };
        }

        [System.Web.Http.HttpPost]
        // POST: api/Movies/UserMovie/2
        public HttpStatusCodeResult UserMovie(int? id, [Bind(Include = "Rating,Category")] UserMovieApi userMovieApi)
        {
            if (id == null || userMovieApi == null || User.Identity.GetUserId() == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Movie movie = db.Movies.Find(id);
            var userId = User.Identity.GetUserId();
            ApplicationUser currentUser = db.Users.Find(userId);

            if (currentUser == null || currentUser.UserMovies == null || movie == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.NotFound);
            }

            var currentUserMovie = db.UserMovies.Find(userId, id);
            if (currentUserMovie != null)
            {
                currentUserMovie.Rating = userMovieApi.Rating;
                currentUserMovie.Category = (CategoryEnum)userMovieApi.Category;
                db.SaveChanges();
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }

            var newUserMovie = new UserMovie() { User = currentUser, Movie = movie, Category = (CategoryEnum)userMovieApi.Category, Rating = userMovieApi.Rating };
            db.UserMovies.Add(newUserMovie);

            db.SaveChanges();
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

    }

    public class PersonController : ApiController
    {
        private MdbContext db = new MdbContext();

        public IEnumerable<PersonApi> GetDirectors()
        {
            return db.Directors.Select(director => new PersonApi
            {
                ID = director.PersonID,
                Name = director.Name,
                Surname = director.Surname
            });
        }

        public IEnumerable<PersonApi> GetScreenwriters()
        {
            return db.Screenwriters.Select(screenwriter => new PersonApi
            {
                ID = screenwriter.PersonID,
                Name = screenwriter.Name,
                Surname = screenwriter.Surname
            });
        }

        public IEnumerable<PersonApi> GetActors()
        {
            return db.Actors.Select(actor => new PersonApi
            {
                ID = actor.PersonID,
                Name = actor.Name,
                Surname = actor.Surname
            });
        }
    }

    public class TagApiController : ApiController
    {
        private MdbContext db = new MdbContext();

        // GET: api/TagApi/GetAll
        public IEnumerable<String> GetAll()
        {
            var list = new List<String>();

            foreach (var tag in Enum.GetValues(typeof(TagEnum)).Cast<TagEnum>())
            {
                list.Add(tag.ToString());
            }

            return list;

            /*return db.Tags
              .Select(tag => new TagApi
              {
                  TagID = tag.TagID,
                  Name = tag.Name,
                  RealName = tag.Name.ToString()
              });*/
        }
    }

}
