using MDB.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace MDB.DAL
{
    public class MdbInitializer : DropCreateDatabaseAlways<MdbContext>
    {
        protected override void Seed(MdbContext context)
        {
            string dummyDir = AppDomain.CurrentDomain.BaseDirectory + @"\Dummy";

            var tag1 = new Tag() { Name = TagEnum.Drama };
            var tag2 = new Tag() { Name = TagEnum.Crime };
            var tag3 = new Tag() { Name = TagEnum.Mystery };
            var tag4 = new Tag() { Name = TagEnum.Adventure };

            var movie1 = new Movie() { Title = "Seven Samurai", Year = 1954, Description = "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.", Image = (Image.FromFile(dummyDir + @"\1.jpg")).toByteArray() };
            var movie2 = new Movie() { Title = "The Hidden Fortress", Year = 1958, Description = "Lured by gold, two greedy peasants escort a man and woman across enemy lines. However, they do not realize that their companions are actually a princess and her general.", Image = (Image.FromFile(dummyDir + @"\2.jpg")).toByteArray() };
            var movie3 = new Movie() { Title = "High And Low", Year = 1963, Description = "An executive of a shoe company becomes a victim of extortion when his chauffeur's son is kidnapped and held for ransom.", Image = (Image.FromFile(dummyDir + @"\3.jpg")).toByteArray() };
            var movie4 = new Movie() { Title = "Harakiri", Year = 1962, Description = "An elder ronin samurai arrives at a feudal lord's home and requests an honorable place to commit suicide.", Image = (Image.FromFile(dummyDir + @"\4.jpg")).toByteArray() };
            movie1.Tags = new List<Tag> { tag1 };
            movie2.Tags = new List<Tag> { tag1, tag4 };
            movie3.Tags = new List<Tag> { tag1, tag2, tag3 };
            movie4.Tags = new List<Tag> { tag1 };

            var actor1 = new Actor() { Name = "Mifune", Surname = "Toshiro", Born = DateTime.Now, Bio = "Toshiro Mifune achieved more worldwide fame than any other Japanese actor of his century. He was born in Tsingtao, China, to Japanese parents and grew up in Dalian. He did not set foot in Japan until he was 21.", Image = (Image.FromFile(dummyDir + @"\act1.jpg")).toByteArray() };
            var actor2 = new Actor() { Name = "Nakadai", Surname = "Tatsuya", Born = DateTime.Now, Bio = "Japanese leading man, an important star and one of the handful of Japanese actors well known outside Japan. Nakadai was a tall handsome clerk in a Tokyo shop when director Masaki Kobayashi encountered him and cast him in Kabe atsuki heya (1956).", Image = (Image.FromFile(dummyDir + @"\act2.jpg")).toByteArray() };
            actor1.Movies = new List<Movie>() { movie1, movie2, movie3 };
            actor2.Movies = new List<Movie>() { movie3, movie4 };

            var director1 = new Director() { Name = "Kurosawa", Surname = "Akira", Born = DateTime.Now, Bio = "After training as a painter (he storyboards his films as full-scale paintings), Kurosawa entered the film industry in 1936 as an assistant director, eventually making his directorial debut with Sugata Sanshirô (1943).", Image = (Image.FromFile(dummyDir + @"\dir1.jpg")).toByteArray() };
            var director2 = new Director() { Name = "Kobayashi", Surname = "Masaki", Born = DateTime.Now, Bio = "Masaki Kobayashi was born on February 14, 1916 in Hokkaido, Japan. He was a director and writer, known for Seppuku (1962), Ningen no jôken (1959) and Kaidan (1964). He died on October 4, 1996 in Tokyo, Japan.", Image = (Image.FromFile(dummyDir + @"\dir2.jpg")).toByteArray() };
            director1.Movies = new List<Movie>() { movie1, movie2, movie3 };
            director2.Movies = new List<Movie>() { movie4 };

            var screenwriter1 = new Screenwriter() { Name = "Hashimoto", Surname = "Shinobu", Born = DateTime.Now, Bio = "Shinobu Hashimoto was born on April 18, 1918. He is a writer and director, known for Shichinin no samurai (1954), Rashômon (1950) and Ikiru (1952)." };
            screenwriter1.Movies = new List<Movie>() { movie1, movie2, movie3, movie4 };

            /*
            movie1.Actors.Add(actor1);
            movie2.Actors.Add(actor1);
            movie3.Actors.Add(actor1);
            movie3.Actors.Add(actor2);
            movie4.Actors.Add(actor2);
            movie1.Director = director1;
            movie2.Director = director1;
            movie3.Director = director1;
            movie4.Director = director2;
            movie1.Screenwriters.Add(screenwriter1);
            movie2.Screenwriters.Add(screenwriter1);
            movie3.Screenwriters.Add(screenwriter1);
            movie4.Screenwriters.Add(screenwriter1);
            */

            context.Movies.Add(movie1);
            context.Movies.Add(movie2);
            context.Movies.Add(movie3);
            context.Movies.Add(movie4);
            context.Actors.Add(actor1);
            context.Actors.Add(actor2);
            context.Directors.Add(director1);
            context.Directors.Add(director2);
            context.Screenwriters.Add(screenwriter1);

            context.SaveChanges();
            //base.Seed(context);
        }
    }
}