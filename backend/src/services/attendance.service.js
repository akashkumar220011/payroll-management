exports.processAttendence = (checkIn, checkOut, officeStart,officeEnd)=>{
    if(!checkIn || !checkOut) return {};

    const diffMinutes = (checkOut-checkIn)/60000;

    const late = Math.max(0,(checkIn-officeStart)/60000);
    const early = Math.max(0,(officeEnd- checkout)/60000);

    const overtime = Math.max(0,(checkOut-officeEnd)/60000);

    return {
        totalWorkMinutes: Math.floor(diffMinutes),
        lateMinutes:Math.floor(late),
        earlyMinutes: Math.floor(early),
        overtimeMinutes:Math.floor(overtime)
    };
};