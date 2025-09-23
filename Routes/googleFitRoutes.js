const express = require("express");
const router = express.Router();
const { googleAuth, googleCallback, getGoogleSteps } = require("../controllers/googleFitController");

// Start OAuth flow
router.get("/auth", googleAuth);

// OAuth callback
router.get("/callback", googleCallback);

// Example: fetch steps
router.get("/steps", getGoogleSteps);

module.exports = router;
