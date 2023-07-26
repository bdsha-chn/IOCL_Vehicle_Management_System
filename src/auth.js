const express = require("express");
const router = express.Router();
const { collection } = require("./mongodb");

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await collection.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ error: "Incorrect password." });
      }
  
      res.status(200).json({ message: "Login successful.", user });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  });
  
  module.exports = router;