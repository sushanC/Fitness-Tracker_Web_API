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
            validate: {
                validator: function (v) {
                    const typeUnits = {
                        steps: ["count"],
                        pushups: ["count"],
                        heart_rate: ["bpm"],
                        calories: ["kcal"],
                        workout: ["minutes", "hours"],
                    };
                    return typeUnits[this.type]?.includes(v);
                },
                message: (props) =>
                    `${props.value} is not a valid unit for activity type ${props.instance.type}`,
            },
        },
        startTime: {
            type: Date,
            default: Date.now,
        },
        endTime: {
            type: Date,
            validate: {
                validator: function (v) {
                    return !v || v >= this.startTime;
                },
                message: "endTime must be after startTime",
            },
        },
        raw: {
            type: Object,
        },
    },
    { timestamps: true }
);

// Add index for better query performance
activitySchema.index({ userId: 1, type: 1, startTime: -1 });

module.exports = mongoose.model("Activity", activitySchema);
