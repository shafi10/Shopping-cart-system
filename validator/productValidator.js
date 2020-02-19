const {body } = require('express-validator');


module.exports = [
    body('title')
    .not().isEmpty().withMessage('Title can not be empty'),
    body('desc')
    .not().isEmpty().withMessage('Description can not be empty'),
    body('category')
    .not().isEmpty().withMessage('Category can not be empty'),
    body('price')
    .not().isEmpty().withMessage('Price can not be empty')
]