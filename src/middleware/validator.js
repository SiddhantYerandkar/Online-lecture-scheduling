const mongoose = require('mongoose')

//============================// isValidId //============================

const isIdValidId = function (value) {
    return mongoose.Types.ObjectId.isValid(value);
};

//==============================// isValidString //===============================//

const isValidString = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    //if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};


//==============================// isValidName //===============================//

const isValidName = function (name) {
    if (/^[a-zA-Z ,.'-]+$/.test(name)) {
        return true;
    }
};

//==============================// isValidDate //===============================

const isValidDate = function (value) {
    let dateFormatRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/
    if (dateFormatRegex.test(value)) {
        return true
    } else {
        return false
    }
}


module.exports = { isIdValidId, isValidString, isValidName, isValidDate, }