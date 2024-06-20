const express = require("express");
const { Get_All, Get_One, Search } = require("../controllers/post.controller");

const router = express.Router();

router.get("/", Get_All);

router.get("/post/:id", Get_One);

router.get("/about", (req, res) => {
  res.render("about",{currentRoute:"/about"});
});

router.get("/contact", (req, res) => {
    res.render("contact",{currentRoute:"/contact"});
  });

router.post("/search", Search);

module.exports = router;
