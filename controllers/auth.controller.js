const bcryptjs = require("bcryptjs/dist/bcrypt");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/user.model");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const searchedUser = await User.findOne({ email });

        if (!searchedUser) {
            return res.status(400).json({
                msg: 'Email / Password incorrect',
            })
        }

        const isValidPassword = bcryptjs.compareSync(password, searchedUser.password);

        if (!isValidPassword) {
            return res.status(400).json({
                msg: 'Email / Password incorrect',
            })
        }

        const token = await generateJWT(searchedUser.id);

        res.json({
            msg: 'Login successful',
            searchedUser,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Something goes wrong, contact with the administrator"
        })
    }
}

const sigin = async (req, res) => {
    const { name, nickname, email, password } = req.body;
    const user = new User({ name, email, password, nickname });

    const isUnique = await User.findOne({ email });
    if (isUnique) {
        return res.status(400).json({
            ok: false,
            msg: "This email already exist",
        })
    }

     // Encrypt password
     const salt = bcryptjs.genSaltSync();
     user.password = bcryptjs.hashSync(password, salt);
 
     await user.save();
 
     res.status(201).json({
         ok: true,
         msg: "User created succesfully",
         user
     })
}

module.exports = {
    login,
    sigin
}