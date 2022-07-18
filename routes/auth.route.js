const { Router } = require("express");
const { login, sigin } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares");
const { emailExist } = require("../helpers/db-validators");
const { check } = require("express-validator");

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('email').custom(emailExist),
    check('password', "Password is required").notEmpty(),
    validateFields
], login)

router.post('/sigin', [
    check('email', 'Email is required').isEmail(),
    check('name', "Name is required").notEmpty(),
    check('password', "Password is required").notEmpty(),
    check('nickname', "Nickname is required").notEmpty(),
    validateFields
], sigin)





module.exports = router;