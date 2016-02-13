using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MDB.DAL;
using MDB.Models;
using System.Web.Http;
using static MDB.DAL.ApiClasses;
using System.Web.Security;
using Microsoft.AspNet.Identity;
using System.Net.Http;

namespace MDB.ApiControllers
{
    public class MoviesController : ApiController
    {
        private MdbContext db = new MdbContext();
        // GET: api/Movies
        public IQueryable<MovieApi> GetMovies()
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
            if(currentUserMovie == null)
            {
                return new UserMovieApi()
                {
                    Rating = 0,
                    Category = 0,
                    AvgRating = movie.AverageRating
                };
            }
            return new UserMovieApi(){
                Rating = currentUserMovie.Rating,
                Category = (int) currentUserMovie.Category,
                AvgRating = movie.AverageRating
            };
            
        }

        [System.Web.Http.HttpPost]
        // POST: api/Movies/UserMovie/2
        public HttpStatusCodeResult UserMovie(int? id, [Bind(Include = "Rating,Category")] UserMovieApi userMovieApi)
        {
            if (id == null || userMovieApi == null)
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
}

namespace MDB.Controllers
{
    public class MoviesController : Controller
    {
        private MdbContext db = new MdbContext();

        // GET: Movies
        public ActionResult Index()
        {
            return View();
        }

        // GET: Movies/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        // GET: Movies/Create
        [System.Web.Mvc.Authorize]
        public ActionResult Create()
        {
            return View();
        }

        // POST: Movies/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MovieID,Image,Title,Year,Description")] Movie movie)
        {
            if (ModelState.IsValid)
            {
                db.Movies.Add(movie);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(movie);
        }

        // GET: Movies/Edit/5
        [System.Web.Mvc.Authorize]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        // POST: Movies/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MovieID,Image,Title,Year,Description")] Movie movie)
        {
            if (ModelState.IsValid)
            {
                db.Entry(movie).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(movie);
        }

        // GET: Movies/Delete/5
        [System.Web.Mvc.Authorize]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        // POST: Movies/Delete/5
        [System.Web.Mvc.Authorize]
        [System.Web.Mvc.HttpPost, System.Web.Mvc.ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Movie movie = db.Movies.Find(id);
            db.Movies.Remove(movie);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
