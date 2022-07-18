const { User, Favorite } = require("../models");

const emailExist = async (inputEmail) => {
    // Validate if email already exist
    const searchedEmail = await User.findOne({ email: inputEmail });

    if (!searchedEmail) {
        throw new Error(`Email ${inputEmail} doesn't exist`)
    }
}

const favoriteExistById = async (id) => {

    const searchedFavorite = await Favorite.findById(id);

    if (!searchedFavorite) {
        throw new Error(`Id ${id} doesn't exist`)
    }
}


module.exports = {
    emailExist,
    favoriteExistById
}