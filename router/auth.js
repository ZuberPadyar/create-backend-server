const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

require("../db/conn")
const User = require("../models/userSchema")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("router get successfully")
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, work, password, cpassword } = req.body;

    // validate user input
    if (!name || !email || !phone || !work || !password || !cpassword) {
      return res.status(422).json({ error: "Please fill in all fields" });
    }

    const userexist = await User.findOne({ email: email });
    if (userexist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    const user = new User({ name, email, phone, work, password, cpassword });
    await user.save();

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to register" });
  }
});

module.exports = router;
