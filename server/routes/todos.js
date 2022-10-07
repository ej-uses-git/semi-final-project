const express = require("express");
const router = express.Router();
const database = require("../utilities/database");

// /api/todos

router.put("/:todoId", async (req, res, next) => {
  const { todoId } = req.params;
  const { completed } = req.body;
  const result = await database.markTodoCompletion(todoId, completed);
  if (result instanceof Error) return res.status(500).send(result.message);
  if (!result) return res.status(400).send(result);
  res.send(result);
});

module.exports = router;
