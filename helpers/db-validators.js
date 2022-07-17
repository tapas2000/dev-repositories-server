const { User } = require("../models");

const emailExist = async (inputEmail) => {
    // Validate if email already exist
    const searchedEmail = await User.findOne({ email: inputEmail });

    if (!searchedEmail) {
        throw new Error(`Email ${inputEmail} doesn't exist`)
    }
}


module.exports = {
    emailExist,
}