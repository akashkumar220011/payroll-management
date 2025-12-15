const employeeService = require("../services/employee.service");

exports.create = async (req, res, next)=>{
    try{
        const emp = await employeeService.createEmployee(req.body);
        res.status(201).json(emp);
    } catch(err){
        next(err);
    }
};

exports.getAll = async(req, res, next)=>{
    try{
        const result = await employeeService.getAllEmployees();
        res.json(result);
    } catch(err){
        next(err);
    }
};