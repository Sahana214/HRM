const express = require("express");
const jwt = require("jsonwebtoken");
const Availability = require("../models/Availability");
const User = require("../models/User");
const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Submit availability
router.post("/", auth, async (req, res) => {
  try {
    const { days } = req.body;
    const availability = new Availability({ user: req.user, days });
    await availability.save();
    res.json({ message: "✅ Availability saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get team availability
router.get("/", auth, async (req, res) => {
  try {
    const data = await Availability.find().populate("user", "email");
    res.json(
      data.map((a) => ({
        user: a.user.email,
        days: a.days,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;