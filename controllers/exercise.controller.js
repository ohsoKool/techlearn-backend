import mongoose from "mongoose";
import Exercise from "../models/exercise.model.js";

export const createExercise = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newExercise = await Exercise.create({ title, description });

    if (!newExercise) {
      return res.status(400).json({ message: "Failed to create the exercise" });
    }

    res.status(201).json({
      message: "Exercise successfully created",
      exercise: newExercise,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while creating an exercise",
      error: error.message,
    });
  }
};

export const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({});

    if (!exercises.length) {
      return res.status(200).json({ message: "No exercises found" });
    }

    res.status(200).json({
      message: "Successfully fetched all exercises",
      exercises,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching exercises",
      error: error.message,
    });
  }
};

export const updateExercise = async (req, res) => {
  const { exerciseId } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
    return res.status(400).json({ message: "Invalid exercise ID" });
  }

  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json({
      message: "Exercise updated successfully",
      exercise: updatedExercise,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while updating the exercise",
      error: error.message,
    });
  }
};

export const getExerciseById = async (req, res) => {
  const { exerciseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
    return res.status(400).json({ message: "Invalid exercise ID" });
  }

  try {
    const exercise = await Exercise.findById(exerciseId);

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json({
      message: "Exercise fetched successfully",
      exercise,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching the exercise",
      error: error.message,
    });
  }
};

export const deleteExercise = async (req, res) => {
  const { exerciseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
    return res.status(400).json({ message: "Invalid exercise ID" });
  }

  try {
    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);

    if (!deletedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while deleting the exercise",
      error: error.message,
    });
  }
};
