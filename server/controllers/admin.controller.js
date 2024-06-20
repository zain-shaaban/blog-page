const Post = require("../models/post");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminLayouts = "../views/layouts/admin.ejs";

const AdminPage = async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog Created By Zein:)",
    };
    res.render("admin/index", { locals, layout: AdminLayouts });
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        return res.redirect("/admin/dashboard");
      }
      return res.status(404).send("The Password Is Wrong");
    }
    res.status(500).send("The Email Is Not Exist");
  } catch (error) {
    console.log(error.message);
  }
};

const register = async (req, res) => {
  try {
    const { email, password, fname, lname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      fname,
      lname,
    });
    res.status(201).json({ newUser });
  } catch (error) {
    if (error.code == 11000)
      return res.status(409).send("This Email Is Already Existed");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const dashboard = async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog Created By Zein:)",
    };
    const data = await Post.find();
    res.render("admin/dashboard", { locals, data, layout: AdminLayouts });
  } catch (error) {
    console.log(error);
  }
};

const checkLogIn = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      return next();
    } catch (error) {
      console.log(error.message);
      res.redirect("/admin");
    }
  }
};

const add_post = async (req, res) => {
  try {
    const locals = {
      title: "Add-Post",
      description: "Simple Blog Created By Zein:)",
    };
    res.render("admin/add_post", { locals, layout: AdminLayouts });
  } catch (error) {
    console.log(error);
  }
};

const add_new_post = async (req, res) => {
  try {
    const { title, body } = req.body;
    await Post.create({ title, body });
    res.status(201).redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const edit_post = async (req, res) => {
  try {
    const locals = {
      title: "Edit Post",
      description: "Simple Blog Created By Zein:)",
    };
    const id = req.params.id;
    const post = await Post.findById(id);
    res.render("admin/edit_post", { locals, layout: AdminLayouts, post });
  } catch (error) {
    console.log(error);
  }
};

const edit_new_post = async (req, res) => {
  try {
    const { title, body } = req.body;
    await Post.findByIdAndUpdate(req.params.id,{title,body});
    res.status(201).redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const Delete_Post=async(req,res)=>{
  try {
    await Post.deleteOne({_id:req.params.id})
    res.redirect("/admin/dashboard")
  } catch (error) {
    console.log(error)
  }
}

const logout=(req,res)=>{
  res.clearCookie("token");
  res.redirect("/")
}

module.exports = {
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
};
