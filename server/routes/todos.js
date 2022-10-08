const express = require("express");
const router = express.Router();
const { callProcedure } = require("../utilities/database");

// /api/todos

router.put("/:todoId", async (req, res, next) => {
  const { todoId } = req.params;
  const { completed } = req.body;
  const result = await callProcedure(
    "mark_todo_completion",
    false,
    todoId,
    completed
  );
  if (result instanceof Error) return res.status(500).send(result);
  res.send(result);
});

module.exports = router;
