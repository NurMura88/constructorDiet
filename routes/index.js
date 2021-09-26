const express = require("express");
const router = express.Router();

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/", (req, res) => {
  let photoAlbum = [
    "11.jpg",
    "22.jpg",
    "33.jpg",
    "44.jpg",
    "55.jpg",
    "66.jpg",
    "77.jpg",
  ];
  let el = Math.floor(Math.random() * 6);
  res.json({ key: photoAlbum[el] });
});

module.exports = router;
