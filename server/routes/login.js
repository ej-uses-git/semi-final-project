const express = require("express");
const router = express.Router();
const { callProcedure } = require("../utilities/database");

// /api/login

/* POST to Check Login Info */
router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  const result = await callProcedure(
    "check_login_info",
    true,
    username,
    password
  );
  if (result instanceof Error) return res.status(500).send(result.message);
  if (!result) return res.status(400).send(false);
  res.send(`${result[0].user_id}`);
});

module.exports = router;
