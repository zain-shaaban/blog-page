const Post = require("../models/post");

const Get_All = async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog Created By Zein:)",
    };
    const limitPage = 10;
    const numPage = +req.query.page || 1;
    const skiped = limitPage * (numPage - 1);
    const data = await Post.find()
      .sort({ updatedAt: -1 })
      .skip(skiped)
      .limit(limitPage);
    const count = (await Post.find()).length;
    const nextPage = numPage + 1;
    const hasNextPage = nextPage <= Math.ceil(count / limitPage);
    res.render("index", {
      locals,
      data,
      current: numPage,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const Get_One = async (req, res) => {
  try {
    const OnePost = await Post.findById(req.params.id);
    const locals = {
      title: OnePost.title,
      description: "Simple Blog Created By Zein:)",
    };
    res.render("post", {
      locals,
      OnePost,
      currentRoute: `/post/${req.params.id}`,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const Search = async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog Created By Zein:)",
    };
    let searchTerm = req.body.searchTerm.replace(/^[a-zA-Z1-9]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, "i") } },
        { body: { $regex: new RegExp(searchTerm, "i") } },
      ],
    });
    res.render("search", {
      locals,
      data,
    });
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = {
  Get_All,
  Get_One,
  Search,
};
