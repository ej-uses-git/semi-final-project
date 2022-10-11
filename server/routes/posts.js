const express = require("express");
const router = express.Router();
const { callProcedure, postNewComment } = require("../utilities/database");

// /api/posts

//* GET REQUESTS
/* GET Post Comments */
router.get("/:postId/comments", async (req, res, next) => {
  const { postId } = req.params;
  const result = await callProcedure("get_post_comments", true, postId);
  if (result instanceof Error) return res.status(500).send(result);
  if (!result) return res.status(400).send(false);
  res.send(result);
});

//* POST REQUESTS
/* POST New Comment */
router.post("/:postId/comments", async (req, res, next) => {
  const { postId } = req.params;
  let { body, commenterId } = req.body;
  body = body.replaceAll(/\\/g, "\\\\").replaceAll(/'/g, "\\'");
  const result = await postNewComment(body, commenterId, postId);
  if (result instanceof Error) return res.status(500).send(result.message);
  if (!result) return res.status(400).send(false);
  res.send(result);
});

module.exports = router;
