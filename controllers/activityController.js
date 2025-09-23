const Activity = require("../models/activityModel");

// Add Activity
const addActivity = async (req, res) => {
    try {
        const { type, value, unit, startTime, endTime, raw } = req.body;

        // Validate required fields
        if (!type || !value || !unit) {
            return res.status(400).json({ message: "type, value, and unit are required" });
        }

        const activity = await Activity.create({
            userId: req.userId, // Make sure authMiddleware sets req.userId
            type,
            value,
            unit,
            startTime,
            endTime,
            raw,
        });

        res.status(201).json(activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get User Activities
const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.userId }).sort({ startTime: -1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addActivity, getActivities };
