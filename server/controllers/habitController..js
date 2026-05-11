const Habit = require("../models/Habit");

const createHabit = async (req, res) => {
  try {
    const { title, description } = req.body;

    const habit = await Habit.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id });

    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    // only owner can update
    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedHabit = await Habit.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedHabit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Habit.findByIdAndDelete(id);

    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const completeHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // ownership check
    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const today = new Date().toDateString();

    const alreadyCompleted = habit.completedDates.some(
      (date) => new Date(date).toDateString() === today
    );

    if (alreadyCompleted) {
      return res.status(400).json({
        message: "Already completed today",
      });
    }

    habit.completedDates.push(new Date());
    habit.streak += 1;

    await habit.save();

    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  completeHabit,
};