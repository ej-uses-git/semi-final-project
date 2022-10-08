const express = require("express");
const router = express.Router();
const { callProcedure } = require("../utilities/database");

// /api/comments

/* DELETE Comment */
router.delete("/:commentId", async (req, res, next) => {
  const { commentId } = req.params;
  const result = await callProcedure("delete_comment", true, commentId);
  if (result instanceof Error) return res.status(500).send(result.message);
  res.send(result);
});

module.exports = router;
