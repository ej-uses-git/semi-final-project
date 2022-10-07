const express = require("express");
const router = express.Router();
const database = require("../utilities/database");

// /api/posts

// // GET REQUESTS
/* GET Post Comments */
// * works
router.get("/:postId/comments", async (req, res, next) => {
  const { postId } = req.params;
  const result = await database.getPostComments(postId);
  if (result instanceof Error) return res.status(500).send(result.message);
  if (!result) return res.status(400).send(result);
  res.send(result);
});

// // POST REQUESTS
/* POST New Comment */
router.post("/:postId/comments", async (req, res, next) => {
  const { postId } = req.params;
  const { body, commenterId } = req.body;
  const result = await database.postNewComment(body, commenterId, postId);
  if (result instanceof Error) return res.status(500).send(result.message);
  if (!result) return res.status(400).send(result);
  res.send(result); 
});

module.exports = router;
