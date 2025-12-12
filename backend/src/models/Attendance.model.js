const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    employee:{ type: mongoose.Schema.Types.ObjectId, ref:'Employee',required: true},
    date:{type: Date, required: true},
    status:{type: String, enum:['present', 'absent', 'leave', 'holiday'],
        default: 'present'
    },
    checkIn: Date,
    checkOut: Date,
    isHoliday: {
        type:Boolean,
        default: false
    },
    leaveType:{
        type:String,
        enum:['sick', 'casual','earned','half-day','unpaid',null],
        default:null
    },
    halfDay:{type: Boolean,default: false},
    lateMinutes:{type: Number, default:0},
    earlyMinutes:{type: Number, default:0},
    overtimeMinutes:{type: Number, default:0},
    totalWorkMinutes:{type:Number, default:0},
    notes: String
},{timestamps: true});

AttendanceSchema.index({ employee:1, date:1},{unique:true});

module.exports= mongoose.model('Attendance',AttendanceSchema);