using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MDB.Models
{
    public class Tag
    {
        public int TagID { get; set; }

        [Required]
        public TagEnum Name { get; set; }

        [InverseProperty("Tags")]
        public virtual ICollection<Movie> Movies { get; set; }
    }
    public enum TagEnum
    {
        Action, Adventure, Animation, Biography, Comedy, Crime, Documentary, Drama, Family, Fantasy, FilmNoir, History,
        Horror, Music, Musical, Mystery, Romance, SciFi, Sport, Thriller, War, Western
    }
}