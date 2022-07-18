const { Favorite } = require("../models");

const getFavorite = async (req, res) => {

    const { user } = req.body;
    const query = { user };

    const favorites = await Favorite.find(query);

    return res.status(201).json({
        favorites
    })
}

const createFavorite = async (req, res) => {

    const { url, name, user } = req.body;
    const query = { url };

    const favoriteFromDB = await Favorite.findOne(query);
    console.log("heyyy", favoriteFromDB);

    if (favoriteFromDB) {
        return res.status(400).json({
            msg: `Favorite ${name} already is one of yours favorites`
        })
    }

    const inputFavorite = {
        name,
        url,
        user,
    }

    const newFavorite = new Favorite(inputFavorite);

    await newFavorite.save();

    return res.status(201).json({ newFavorite });
}

const deleteFavorite = async (req, res) => {

    const { id } = req.params;
    await Favorite.findByIdAndRemove(id);

    res.status(200).json({
        msg: "Favorite repository deleted",
    })
}

module.exports = {
    getFavorite,
    createFavorite,
    deleteFavorite
}