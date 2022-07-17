const { Router } = require("express");
const { login } = require("../controllers/auth.controller");

const router = Router();

router.post('/login', [
    // check('email', 'Email is required').isEmail(),
    // check('email').custom(emailExist),
    // check('password', "Password is required").notEmpty(),
    // validateFields
], login)

router.post('/sigin', [
    // check('email', 'Email is required').isEmail(),
    // check('email').custom(emailExist),
    // check('password', "Password is required").notEmpty(),
    // validateFields
], login)





module.exports = router;