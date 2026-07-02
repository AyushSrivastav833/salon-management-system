const express = require("express");
const router = express.Router();

const {
  hairstyleRecommendation,
} = require("../controllers/aiController");

router.post("/hairstyle", hairstyleRecommendation);

module.exports = router;