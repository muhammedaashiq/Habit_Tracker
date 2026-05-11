const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { 
    createHabit, 
    getHabits, 
    updateHabit,
    deleteHabit,
    completeHabit
} = require("../controllers/habitController.");

router.post("/", protect, createHabit);
router.get("/", protect, getHabits);
router.put("/:id", protect, updateHabit);
router.delete("/:id", protect, deleteHabit);
router.put("/:id/complete", protect, completeHabit);

module.exports = router;