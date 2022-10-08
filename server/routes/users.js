const express = require("express");
const router = express.Router();
const { callProcedure } = require("../utilities/database");

// /api/users

//* GET REQUESTS
/* GET User's Full Name */
router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const result = await callProcedure("get_user_full_name", true, userId);
  if (result instanceof Error) return res.status(500).send(result);
  if (!result.length) return res.status(400).send(false);
  res.send(result[0].full_name);
});

/* GET User's Info */
router.get("/:userId/info", async (req, res, next) => {
  const { userId } = req.params;
  const result = await callProcedure("get_user_info", true, userId);
  if (result instanceof Error) return res.status(500).send(result);
  if (!result.length) return res.status(400).send(false);
  res.send(result[0]);
});

/* GET User Todos */
router.get("/:userId/todos", async (req, res, next) => {
  const { userId } = req.params;
  const result = await callProcedure("get_user_todos", true, userId);
  if (result instanceof Error) return res.status(500).send(result);
  res.send(result);
});

/* GET User Posts */
router.get("/:userId/posts", async (req, res, next) => {
  const { userId } = req.params;
  const result = await callProcedure("get_user_posts", true, userId);
  if (result instanceof Error) return res.status(500).send(result);
  res.send(result);
});

module.exports = router;
