const express = require("express");
const router = express.Router();
const database = require("../utilities/database");

// /api/comments

/* DELETE Comment */
router.delete("/:commentId", async (req, res, next) => {
  const { commentId } = req.params;
  const result = await database.deleteComment(commentId);
  if (result instanceof Error) return res.status(500).send(result.message);
  if (!result) return res.status(400).send(result);
  res.send(result);
});

module.exports = router;
