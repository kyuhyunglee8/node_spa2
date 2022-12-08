const express = require('express');
const authRoutes = require("./auth");
const commentRoutes = require("./comments");
const postRoutes = require("./posts");

const router = express.Router();

router.use("/auth", authRoutes)
router.use("/comments", commentRoutes)
router.use("/posts", postRoutes)

module.exports = router;
