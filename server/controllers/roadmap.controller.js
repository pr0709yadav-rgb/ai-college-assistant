import Roadmap from "../models/roadmap.js";
import { generateRoadmapAI } from "../service/roadmap.service.js";

// ======================================
// Save Roadmap
// ======================================

export const saveRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Roadmap saved successfully.",
      roadmap,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Get User Roadmaps
// ======================================

export const getRoadmaps = async (req, res) => {
  try {

    const roadmaps = await Roadmap.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      roadmaps,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Get Single Roadmap
// ======================================

export const getRoadmap = async (req, res) => {
  try {

    const roadmap = await Roadmap.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    res.status(200).json({
      success: true,
      roadmap,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Delete Roadmap
// ======================================

export const deleteRoadmap = async (req, res) => {
  try {

    const roadmap = await Roadmap.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Toggle Task Completion
// ======================================

export const toggleTask = async (req, res) => {
  try {

    const {
      weekIndex,
      taskIndex,
    } = req.body;

    const roadmap = await Roadmap.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    roadmap.roadmap[weekIndex].tasks[taskIndex].completed =
      !roadmap.roadmap[weekIndex].tasks[taskIndex].completed;

    await roadmap.save();

    res.status(200).json({
      success: true,
      roadmap,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Generate AI Roadmap
// ======================================

export const generateRoadmap = async (req, res) => {
  try {

    const {
      goal,
      level,
      duration,
    } = req.body;

    if (!goal || !level || !duration) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    const aiRoadmap = await generateRoadmapAI(
      goal,
      level,
      duration
    );

    res.status(200).json({
      success: true,
      roadmap: aiRoadmap.roadmap,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};