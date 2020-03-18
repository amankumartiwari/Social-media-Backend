const express = require("express");
const router = express.Router();
const {
  getRoutes,
  createPost,
  postByUser,
  postFindById,
  isPoster,
  deletePost,
  updatePost
} = require("../controllers/post");
const { userFindById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validators");

router.get("/posts", getRoutes);

router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);

router.get("/posts/by/:userId", requireSignin, postByUser);

router.put("post/:postId", requireSignin, isPoster, updatePost);

router.delete("post/:postId", requireSignin, isPoster, deletePost);

router.param("userId", userFindById);
router.param("postId", postFindById);

module.exports = router;
