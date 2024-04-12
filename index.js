const createEmployeeRecord = (employeeData) => {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = (employeeData) => {
    return employeeData.map(createEmployeeRecord);
};

const createTimeInEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
};

const createTimeOutEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
};

const hoursWorkedOnDate = function (date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
};

const wagesEarnedOnDate = function (date) {
    const hoursWorked = hoursWorkedOnDate(date);
    const wagesEarned = hoursWorked * this.payPerHour;
    return wagesEarned;
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(event => event.date);
    const payable = eligibleDates.reduce((memo, date) => {
        return memo + wagesEarnedOnDate.call(this, date);
    }, 0);
    return payable;
};

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(employee => employee.firstName === firstName);
};

const calculatePayroll = (employeeRecords) => {
    return employeeRecords.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor.call(employee);
    }, 0);
};
