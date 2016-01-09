using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MDB.DAL;
using MDB.Models;

namespace MDB.Controllers
{
    public class ScreenwritersController : Controller
    {
        private MdbContext db = new MdbContext();

        // GET: Screenwriters
        public ActionResult Index()
        {
            return View(db.Screenwriters.ToList());
        }

        // GET: Screenwriters/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Screenwriter screenwriter = db.Screenwriters.Find(id);
            if (screenwriter == null)
            {
                return HttpNotFound();
            }
            return View(screenwriter);
        }

        // GET: Screenwriters/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Screenwriters/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "PersonID,Image,Name,Surname,Bio,Born")] Screenwriter screenwriter)
        {
            if (ModelState.IsValid)
            {
                db.Screenwriters.Add(screenwriter);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(screenwriter);
        }

        [Authorize]
        // GET: Screenwriters/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Screenwriter screenwriter = db.Screenwriters.Find(id);
            if (screenwriter == null)
            {
                return HttpNotFound();
            }
            return View(screenwriter);
        }

        // POST: Screenwriters/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "PersonID,Image,Name,Surname,Bio,Born")] Screenwriter screenwriter)
        {
            if (ModelState.IsValid)
            {
                db.Entry(screenwriter).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(screenwriter);
        }

        // GET: Screenwriters/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Screenwriter screenwriter = db.Screenwriters.Find(id);
            if (screenwriter == null)
            {
                return HttpNotFound();
            }
            return View(screenwriter);
        }

        // POST: Screenwriters/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Screenwriter screenwriter = db.Screenwriters.Find(id);
            db.Screenwriters.Remove(screenwriter);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
