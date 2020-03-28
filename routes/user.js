const express = require("express");

const { requireSignin } = require("../controllers/auth");
const {
  userFindById,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  userPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower
} = require("../controllers/user");
const router = express.Router();

router.put("/user/follow", requireSignin, addFollowing, addFollower);

router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);

router.get("/users", getAllUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);

//for photo
router.get("/user/photo/:userId", userPhoto);

// any rote containing userById param will first execute user find by id
router.param("userId", userFindById);

module.exports = router;
