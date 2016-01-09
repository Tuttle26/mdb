using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MDB.Models
{
    public class Screenwriter : Person
    {
        public virtual ICollection<Movie> Movies { get; set; }
    }
}