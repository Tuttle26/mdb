using MDB.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Linq;
using System.Web;

namespace MDB.Models
{
    public class Person
    {
        [Key]
        public int PersonID { get; set; }
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
        public string Name { get; set; }
        [Required]
        [StringLength(100)]
        public string Surname { get; set; }
        [StringLength(500)]
        public string Bio { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime Born { get; set; }

        public string Fullname { get { return $"{this.Surname} {this.Name}"; } }

    }
}