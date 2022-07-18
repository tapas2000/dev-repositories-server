const { Router } = require("express");
const { check } = require("express-validator");
const { createFavorite, getFavorite, deleteFavorite } = require("../controllers/favorite.controller");
const { favoriteExistById } = require("../helpers/db-validators");

const { validateJWT, validateFields } = require("../middlewares");

const router = Router();

router.get('/', [
    validateJWT,
    validateFields
], getFavorite);

router.post('/', [
    validateJWT,
    check('url', 'Url is required').notEmpty(),
    check('name', 'Name is required').notEmpty(),
    check('createdAt', 'createdAt is required').notEmpty(),
    validateFields
], createFavorite)

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(favoriteExistById),
    validateFields
], deleteFavorite)

module.exports = router;