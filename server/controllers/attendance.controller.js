import Attendance from "../models/attendance.js";

// ======================================
// Add Subject
// ======================================

export const addSubject = async (req, res) => {
  try {
    const {
      semester,
      subject,
      faculty,
      minimumAttendance,
    } = req.body;

    const attendance =
      await Attendance.create({
        user: req.user._id,
        semester,
        subject,
        faculty,
        minimumAttendance,
      });

    res.status(201).json({
      success: true,
      message: "Subject added successfully.",
      attendance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Get All Subjects
// ======================================

export const getAttendance =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.find({
          user: req.user._id,
        }).sort({
          semester: 1,
          subject: 1,
        });

      res.status(200).json({
        success: true,
        attendance,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// ======================================
// Update Subject
// ======================================

export const updateSubject =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.findOneAndUpdate(
          {
            _id: req.params.id,
            user: req.user._id,
          },
          req.body,
          {
            new: true,
          }
        );

      if (!attendance) {

        return res.status(404).json({
          success: false,
          message: "Subject not found.",
        });

      }

      res.status(200).json({
        success: true,
        message:
          "Subject updated successfully.",
        attendance,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// ======================================
// Delete Subject
// ======================================

export const deleteSubject =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.findOneAndDelete({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!attendance) {

        return res.status(404).json({
          success: false,
          message: "Subject not found.",
        });

      }

      res.status(200).json({
        success: true,
        message:
          "Subject deleted successfully.",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// ======================================
// Mark Present
// ======================================

export const markPresent =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!attendance) {

        return res.status(404).json({
          success: false,
          message: "Subject not found.",
        });

      }

      attendance.present += 1;

      attendance.history.push({
        status: "Present",
      });

      await attendance.save();

      res.status(200).json({
        success: true,
        message:
          "Attendance marked present.",
        attendance,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

// ======================================
// Mark Absent
// ======================================

export const markAbsent =
  async (req, res) => {

    try {

      const attendance =
        await Attendance.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!attendance) {

        return res.status(404).json({
          success: false,
          message: "Subject not found.",
        });

      }

      attendance.absent += 1;

      attendance.history.push({
        status: "Absent",
      });

      await attendance.save();

      res.status(200).json({
        success: true,
        message:
          "Attendance marked absent.",
        attendance,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };