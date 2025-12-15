const Employee = require("../models/Employee.model");

exports.createEmployee = async(data)=>{
    return await Employee.create(data);
};
exports.getAllEmployees = async ()=>{
    return await Employee.find();
}