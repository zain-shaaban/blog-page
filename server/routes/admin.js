const express = require("express");
const {
  AdminPage,
  login,
  register,
  dashboard,
  checkLogIn,
  add_post,
  add_new_post,
  edit_post,
  edit_new_post,
  Delete_Post,
  logout
} = require("../controllers/admin.controller");
const router = express.Router();

router.get("/admin", AdminPage);
router.post("/admin/login", login);
router.post("/admin/register", register);
router.get("/admin/dashboard", checkLogIn, dashboard);
router.get("/add-post", checkLogIn, add_post);
router.post("/add-post", checkLogIn, add_new_post);
router.get("/edit-post/:id", checkLogIn, edit_post);
router.put("/edit-post/:id", checkLogIn, edit_new_post);
router.delete("/delete-post/:id",checkLogIn,Delete_Post)
router.get("/admin/logout", checkLogIn, logout);


module.exports = router;
