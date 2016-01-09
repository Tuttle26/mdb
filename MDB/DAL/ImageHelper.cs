using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace MDB.DAL
{
    public static class ImageHelper
    {
        public static byte[] dummyImage = Image.FromFile(AppDomain.CurrentDomain.BaseDirectory + @"\Dummy\placeholder.jpg").toByteArray();
        public static byte[] toByteArray(this Image imageIn)
        {
            MemoryStream ms = new MemoryStream();
            imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
            return ms.ToArray();
        }

        public static Image toImage(this byte[] byteArrayIn)
        {
            MemoryStream ms = new MemoryStream(byteArrayIn);
            Image returnImage = Image.FromStream(ms);
            return returnImage;
        }
    }
}