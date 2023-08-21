const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
//...

var upload = multer({ dest: "./upload/" });
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "books",
});
app.post("/book/addfrom", upload.array(), function (req, res) {
  console.log(req.body);
  const title = req.body.title;
  const authors = req.body.authors;
  const rating = req.body.rating;
  const description = req.body.description;
  const image_url = req.body.image_url;
  db.query(
    "INSERT INTO books (title, authors, rating, description, image_url) VALUES (?,?,?,?,?)",
    [title, authors, rating, description, image_url],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.post("/add", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const title = req.body.title;
  const authors = req.body.authors;
  const rating = req.body.rating;
  const description = req.body.description;
  const image_url = req.body.image_url;
  db.query(
    "INSERT INTO book_fav (id, title, authors, rating, description, image_url) VALUES (?,?,?,?,?,?)",
    [id, title, authors, rating, description, image_url],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//   console.log(req.body);
//   const title = req.body.title;
//   const authors = req.body.authors;
//   const rating = req.body.rating;
//   const description = req.body.description;
//   const image_url = req.body.image_url;
//   // db.query(
//   //   "INSERT INTO books (title, authors, rating, description, image_url) VALUES (?,?,?,?,?)",
//   //   [title, authors, rating, description, image_url],
//   //   (err, result) => {
//   //     if (err) {
//   //       console.log(err);
//   //     } else {
//   //       res.send("Values Inserted");
//   //     }
//   //   }
//   // );
// });
app.get("/getall", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/get/book/:id", (req, res) => {
  const id = req.params.id;
  db.query(" SELECT * FROM books WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getfav", (req, res) => {
  db.query("SELECT * FROM book_fav", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update/book/:id", upload.array(), function (req, res) {
  const id = req.params.id;
  const title = req.body.title;
  const authors = req.body.authors;
  const rating = req.body.rating;
  const description = req.body.description;
  const image_url = req.body.image_url;
  db.query(
    "UPDATE books SET title = ?, description = ?, rating = ?, authors = ?, image_url = ? WHERE id = ?",
    [title, description, rating, authors, image_url, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/fromfav/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM book_fav WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM books WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/delete/all", (req, res) => {
  // const id = req.params.id;
  db.query("SET book_fav = NULL;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
