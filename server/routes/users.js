const express = require("express");
const router = express.Router();
const database = require("../utilities/database");

// /api/users

// // GET REQUESTS
/* GET User's Full Name */
// * works
router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const result = await database.getUserFullname(userId);
  if (result instanceof Error) return res.status(500).send(result.message);
  res.send(result);
});

/* GET User's Info */
// * works
router.get("/:userId/info", async (req, res, next) => {
  const { userId } = req.params;
  const result = await database.getUserInfo(userId);
  if (result instanceof Error) return res.status(500).send(result.message);
  res.send(result);
});


/* GET User Todos */
// * works
router.get("/:userId/todos", async (req, res, next) => {
  const { userId } = req.params;
  const result = await database.getUserTodos(userId);
  if (result instanceof Error) return res.status(500).send(result.message);
  res.send(result);
});

/* GET User Posts */
// * works
router.get("/:userId/posts", async (req, res, next) => {
  const { userId } = req.params;
  const result = await database.getUserPosts(userId);
  if (result instanceof Error) return res.status(500).send(result.message);
  if (!result) return res.status(400).send(result);
  res.send(result);
});

module.exports = router;
