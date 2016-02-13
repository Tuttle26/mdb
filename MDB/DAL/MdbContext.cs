using MDB.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.Linq;
using System.Web;

namespace MDB.DAL
{
    public class MdbContext : IdentityDbContext<ApplicationUser> //can't be DbContext
    {
        public MdbContext() 
            : base("DefaultConnection") 
        {
        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Director> Directors { get; set; }
        public DbSet<Screenwriter> Screenwriters { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<UserMovie> UserMovies { get; set; }
    }
}