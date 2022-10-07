const express = require("express");
const router = express.Router();
const database = require("../utilities/database");

// /api/login

// // POST REQUESTS
/* POST to Check Login Info */
// * works
router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  const result = await database.checkLoginInfo(username, password);
  if (result instanceof Error) return res.status(500).send(result.message);
  if (!result) return res.status(400).send(result);
  res.send(`${result}`);
});

module.exports = router;
