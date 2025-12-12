const mongoose = require("mongoose");

const SalarySlipSchema = new mongoose.Schema({
    payroll:{type: mongoose.Schema.Types.ObjectId, ref:"Payroll", required:true},
    pdfUrl: String,
},{timestamps:true});

module.exports= mongoose.model("SalarySlip", SalarySlipSchema);