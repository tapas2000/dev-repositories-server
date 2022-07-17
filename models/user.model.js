const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is require'],
    },
    email: {
        type: String,
        required: [true, 'Email is require'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is require'],
    },
    nickname: {
        type: String,
    },
})

userSchema.methods.toJSON = function () {
    const { __v, _id, password, ...user } = this.toObject();
    return { ...user, uid: _id };
}

module.exports = model('User', userSchema);