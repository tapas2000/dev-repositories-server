const { Schema, model } = require('mongoose');

const Favorite = Schema({
    name: {
        type: String,
        require: [true, 'Categorie is required']
    },
    url: {
        type: String,
        require: [true, 'Categorie is required']
    },
    description: {
        type: String,
    },
    createdAt: {
        type: String,
        require: [true, 'Categorie is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

Favorite.methods.toJSON = function () {
    const { __v, user, state, ...favorite } = this.toObject();

    return { ...favorite, user };
}

module.exports = model('Favorite', Favorite);
