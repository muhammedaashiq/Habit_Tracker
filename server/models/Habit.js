const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
        },
        streak: {
            type: Number,
            default: 0,
        },

        completedDates: [
            {
                type: Date,
            },
        ],

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Habit", habitSchema);