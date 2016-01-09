using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MDB.Models
{
    public class UserMovie
    {

        [Range(1, 10)]
        public int Rating { get; set; }

        [Required]
        public CategoryEnum Category { get; set; }

        [Key, ForeignKey("User"), Column(Order = 0)]
        public string UserID { get; set; }  //must be string

        [Key, ForeignKey("Movie"), Column(Order = 1)]
        public int MovieID { get; set; }

        public virtual ApplicationUser User { get; set; }
        public virtual Movie Movie { get; set; }
    }

    public enum CategoryEnum
    {
        Watched, To_Watch, Not_Interested
    }
}