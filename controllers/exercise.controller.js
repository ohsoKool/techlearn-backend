import req from "express/lib/request.js";
import Exercise from "../models/exercise.model.js";

export const createExercise = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "title and description are required" });
    }
    const newExercise = await Exercise.create({ title, description });
    if (!newExercise)
      return res.status(400).json({ message: "failed to create the exercise" });
    res
      .status(201)
      .json({ message: "Exercise successfully created", newExercise });
  } catch (error) {
    return res
      .status(500)
      .json("Error occured while creating an exercise", error.name);
  }
};

export const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({});

    if (exercises.length === 0) {
      return res.status(200).json({ message: "No exercises found" });
    }

    res.status(200).json({
      message: "Successfully fetched all the exercises",
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
  try {
    const { exerciseId } = req.params;
    const updateData = req.body;

    if (!exerciseId) {
      return res.status(400).json({ message: "Exercise ID is required" });
    }

    const updatedExercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      updateData,
      { new: true }
    );

    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.status(200).json({
      message: "Successfully updated the exercise",
      updatedExercise,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the exercise",
      error: error.message,
    });
  }
};

export const getExerciseById = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const fetchedExercise = await Exercise.findById(exerciseId);
    if (!fetchedExercise)
      return res.status(404).json({ message: "The exercise was not found" });
    res
      .status(200)
      .json({ message: "Exercise fetched successfully", fetchedExercise });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while getting the exercise",
      error: error.message,
    });
  }
};
export const deleteExercise = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);
    if (!deletedExercise)
      return res.status(404).json({ message: "The exercise was not found" });
    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the exercise",
      error: error.message,
    });
  }
};
