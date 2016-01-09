using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MDB.Models
{
    public class Actor : Person
    {
        [InverseProperty("Actors")]
        public virtual ICollection<Movie> Movies { get; set; }
    }
}