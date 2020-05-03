const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  postByUser,
  postFindById,
  isPoster,
  deletePost,
  updatePost,
  photo,
  singlePost
} = require("../controllers/post");
const { userFindById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validators");

router.get("/posts", getPosts);

router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);

router.get("/posts/by/:userId", requireSignin, postByUser);
router.get("/post/:postId",  singlePost);
router.put("post/:postId", requireSignin, isPoster, updatePost);

router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.get("/post/photo/:postId", photo);

router.param("userId", userFindById);
router.param("postId", postFindById);

module.exports = router;
