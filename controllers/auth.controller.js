const bcryptjs = require("bcryptjs/dist/bcrypt");
// const { generateJWT } = require("../helpers/generate-jwt");
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

        if (!searchedUser.state) {
            return res.status(400).json({
                msg: 'This user no longer is available',
            })
        }

        const validPassword = bcryptjs.compareSync(password, searchedUser.password);

        if (!validPassword) {
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

}

module.exports = {
    login,
    sigin
}