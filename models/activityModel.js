const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["steps", "pushups", "heart_rate", "calories", "workout"],
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        startTime: {
            type: Date,
            default: Date.now,
        },
        endTime: {
            type: Date,
        },
        raw: {
            type: Object,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Activity", activitySchema);