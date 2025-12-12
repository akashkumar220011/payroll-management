const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const e = require('express');


const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: {type: String, required: true, unique: true},
    password:{type:String, required: true, select: false},
    role: {type: String, enum:['admin', 'hr', 'employee'], default:'employee'},
    department: String,
    joiningDate: Date,
    salary:{
        basic:{ type: Number, default:0},
        allowances:[{ name: String, amount: Number}],
        deductions: [{ name: String, amount: Number}],
        pfPercent: { type:Number, default:12}
    },
    bankDetails:{
        accountNumber: String,
        ifsc: String
    }
},{timestamps: true});

//hash password before save
EmployeeSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

EmployeeSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Employee', EmployeeSchema);