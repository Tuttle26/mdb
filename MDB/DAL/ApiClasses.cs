using MDB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MDB.DAL
{
    public static class ApiClasses
    {
        public class MovieApi {
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
            public string Title { get; set; }
            public int Year { get; set; }
            public string Description { get; set; }
            public IEnumerable<TagEnum> Tags { get; set; }
        }

        public class UserMovieApi
        {
            public int Rating { get; set; }
            public int Category { get; set; }
            public double AvgRating { get; set; }
        }
    }
}