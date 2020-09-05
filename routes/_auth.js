const { Router } = require('express');
const router = Router();
const { login, register } = require('../controllers/auth.controller');

const { check } = require('express-validator');

router.post('/login', [
    check('email').isEmail().normalizeEmail().not().isEmpty(),
    check('password').isString().isLength({ min: 6, max: 32 })
], login);
router.post('/register', register);

module.exports = router;