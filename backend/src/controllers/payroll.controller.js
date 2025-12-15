const Payroll = require("../models/Payroll.model");
const Attendance = require("../models/Attendance.model");
const PayrollService = require("../services/payroll.service");

exports.runPayroll = async (req, res, next) => {
  try {
    const { employee, period } = req.body;

    const attendance = await Attendance.find({ employee, period });

    const attendanceSummary = {
      totalDays: attendance.length,
      presentDays: attendance.filter(a => a.status === "present").length,
      absentDays: attendance.filter(a => a.status === "absent").length,
      paidLeaves: attendance.filter(a => a.status === "leave").length,
      halfDays: attendance.filter(a => a.halfDay).length,
      overtimeMinutes: attendance.reduce((sum, a) => sum + a.overtimeMinutes, 0)
    };

    const employeeData = req.employeeObj;

    const result = PayrollService.generatePayroll(employeeData, attendanceSummary);

    const payroll = await Payroll.create({
      employee,
      period,
      attendance: attendanceSummary,
      earnings: result.earnings,
      deductions: result.deductions,
      netSalary: result.netSalary
    });

    res.status(201).json(payroll);

  } catch (err) {
    next(err);
  }
};
