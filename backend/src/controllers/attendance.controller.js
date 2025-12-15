const Attendance = require("../models/Attendance.model");
const { processAttendance } = require("../services/attendance.service");

exports.markAttendance = async (req, res, next) => {
  try {
    const { employee, date, checkIn, checkOut, status, leaveType } = req.body;

    const officeStart = new Date(date).setHours(9,0,0,0);
    const officeEnd   = new Date(date).setHours(18,0,0,0);

    const processed = processAttendance(
      checkIn ? new Date(checkIn) : null,
      checkOut ? new Date(checkOut) : null,
      officeStart,
      officeEnd
    );

    const data = {
      employee,
      date,
      status,
      leaveType,
      ...processed
    };

    const att = await Attendance.findOneAndUpdate(
      { employee, date },
      data,
      { upsert: true, new: true }
    );

    res.status(201).json(att);

  } catch (err) {
    next(err);
  }
};
