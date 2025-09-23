const express = require("express");
const router = express.Router();
const { addActivity, getActivities } = require("../controllers/activityController");
const protect = require("../middleware/authMiddleware"); // now protect is a function

router.post("/", protect, addActivity);
router.get("/", protect, getActivities);

module.exports = router;
