const Post = require("../models/postModel");

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        status: "succes",
        results: posts.length,
        data: {
          posts,
        },
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "fail",
        error: error,
      });
    });
};

exports.getOnePost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.status(200).json({
        status: "succes",
        data: {
          post,
        },
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "fail",
        error: error,
      });
    });
};

exports.createPost = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({
        status: "succes",
        data: {
          post,
        },
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "fail",
        error: error,
      });
    });
};
exports.updatePost = (req, res, next) => {
  Post.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ status: "succes" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({
        status: "succes",
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "fail",
        error: error,
      });
    });
};
