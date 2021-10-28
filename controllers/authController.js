var bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 12, (err, hash) => {
    if (!hash) {
      return res.status(400).json({
        status: "fail",
        error: "Password feild is required",
      });
    }
    const user = new User({
      username: req.body.username,
      password: hash,
    });
    user
      .save()
      .then((user) => {
        res.status(201).json({
          status: "succes",
          data: {
            user,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "fail",
          error: err,
        });
      });
  });
};

exports.login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "There is an error in your login" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Username or password is incorrect" });
          }
          res.status(200).json({
            status: "succes",
            data: {
              user,
            },
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
