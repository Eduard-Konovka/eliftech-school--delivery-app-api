const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const { ctrlWrapper } = require('../middlewares');
const { products: ctrl } = require('../controllers');

router.get('/', ctrlWrapper(ctrl.getListProducts));

router.get('/:id', ctrlWrapper(ctrl.getProductById));

module.exports = router;
