exports.generatePayroll = (employee, attendanceData)=>{

    //basic salary breakup
    const basic = employee.ctc * 0.40;
    const hra = employee.ctc * 0.20;
    const allowances = employee.ctc * 0.40;

    // Salary per day
    const perDaySalary = employee.ctc / attendanceData.totalDays;

    //Calculated earned salary
    const earnedSalary = (attendanceData.presentDays * perDaySalary)+ (attendanceData.halfDays * (perDaySalary/2))+ (attendanceData.paidLeaves * perDaySalary);
    //Govt deduction
    const pf = basic * 0.12;
    const esi = employee.ctc <= 21000 ? earnedSalary * 0.0075 : 0;

    //Late penalty rule
    const latePenalty = Math.floor(attendanceData.lateMinutes/60) *100;

    const grossSalary = earnedSalary;
    const totalDeductions = pf + esi + latePenalty;
    const netSalary = grossSalary-totalDeductions;
    return {

        earnings: {basic, hra, allowances, grossSalary},
        deductions: {pf, esi, latePenalty, totalDeductions},
        netSalary
    };
};