const express = require("express");
const path = require("path");
const morgan = require("morgan");
const db = require("./db/database");

const app = express();

app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./path/to/static/assets")));

app.use("/api", require("./api"));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./path/to/index.html"));
});

// error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "Internal server error");
});

const port = 3000;
// app.listen(port, function () {
//   console.log(`Your server, listening on port ${port}`);
// });

db.sync({ force: true }) // sync our database
  .then(function () {
    app.listen(port, function () {
      console.log(`Your server, listening on port ${port}`);
    }); // then start listening with our express server once we have synced
  });

module.exports = app;
