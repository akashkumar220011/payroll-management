const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({

  employee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee', 
    required: true 
  },

  period: { 
    type: String, 
    required: true 
  },

 
  attendance: {
    totalDays: { type: Number, default: 0 },
    presentDays: { type: Number, default: 0 },
    absentDays: { type: Number, default: 0 },
    halfDays: { type: Number, default: 0 },
    paidLeaves: { type: Number, default: 0 },
    overtimeMinutes: { type: Number, default: 0 }
  },

 
  earnings: {
    basic: { type: Number, default: 0 },
    hra: { type: Number, default: 0 },
    allowances: { type: Number, default: 0 },
    overtimePay: { type: Number, default: 0 },
    bonuses: { type: Number, default: 0 },
    grossSalary: { type: Number, default: 0 } 
  },


  deductions: {
    tax: { type: Number, default: 0 },
    pf: { type: Number, default: 0 },
    esi: { type: Number, default: 0 },
    latePenalty: { type: Number, default: 0 },
    otherDeductions: { type: Number, default: 0 },
    totalDeductions: { type: Number, default: 0 }
  },

 
  netSalary: { type: Number, default: 0 },

 
  components: { type: Object, default: {} },

  status: { 
    type: String, 
    enum: ['paid', 'unpaid'], 
    default: 'unpaid' 
  },

  paidAt: Date,

  runBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee' 
  },

  // Once payroll is processed, it should be locked
  isLocked: { 
    type: Boolean, 
    default: false 
  }

}, { timestamps: true });

// Prevent double-pay for same month
PayrollSchema.index({ employee: 1, period: 1 }, { unique: true });

module.exports = mongoose.model('Payroll', PayrollSchema);
