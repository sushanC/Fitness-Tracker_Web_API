const Activity = require("../models/activityModel");

// Add Activity
const addActivity = async (req, res) => {
    const { type, duration, calories } = req.body;

    const activity = await Activity.create({
        user: req.user.id,
        type,
        duration,
        calories,
    });

    res.json(activity);
};

// Get User Activities
const getActivities = async (req, res) => {
    const activities = await Activity.find({ user: req.user.id });
    res.json(activities);
};

module.exports = { addActivity, getActivities };
