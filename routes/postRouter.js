const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const protect = require("../middlewares/authMiddelware");
router.get("/", protect, postController.getAllPosts);
router.post("/", postController.createPost);
router.get("/:id", postController.getOnePost);
router.put("/:id", protect, postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
