using MDB.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MDB.Models
{
    public class Movie
    {
        public int MovieID { get; set; }
        public byte[] Image { get; set; }
        public string ImgSrc
        {
            get
            {
                if (Image == null)
                {
                    return String.Format("data:image/jpeg;base64,{0}", Convert.ToBase64String(ImageHelper.dummyImage));
                }
                else
                {
                    return String.Format("data:image/jpeg;base64,{0}", Convert.ToBase64String(Image));
                }

            }
        }
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        [Required]
        [Range(1800, 2200)]
        public int Year { get; set; }
        [StringLength(500)]
        public string Description { get; set; }
        public float AverageRating
        {
            get
            {
                /*int sum = 0, i = 0;
                foreach (UserMovie userMovie in UserMovies)
                {
                    sum += userMovie.Rating;
                    i++;
                } 
                return (float)sum/i;*/
                return 0f;
            }
        }

        [ForeignKey("Director")]
        public int DirectorID;
        public virtual Director Director { get; set; }

        [ForeignKey("Screenwriter")]
        public int ScreenwriterID;
        public virtual Screenwriter Screenwriter { get; set; }

        [InverseProperty("Movies")]
        public virtual ICollection<Actor> Actors { get; set; }

        [InverseProperty("Movies")]
        public virtual ICollection<Tag> Tags { get; set; }

        public virtual ICollection<UserMovie> UserMovies { get; set; }
    }
}