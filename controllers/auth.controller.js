const { validationResult } = require('express-validator');
const User = require('../models/user.model');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken');

validation = (req, res) => {
    const errors = validationResult(req);

    if (!errors) {
        return res.status(400).json({
            message: 'Incorrect user credentials.'
        });
    }
}

const success = (res, user) => {
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.APP_KEY, { expiresIn: '1d' });

    return res.json({
        data: { token }
    });
}

module.exports.login = async (req, res) => {
    validation(req, res);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            data: null,
            meta: { message: 'User doesnt\'t exists!' }
        });
    }

    const compare = await bcrypt.compare(password, user.password);

    if (compare) {
        return success(res, user);
    }

    res.status(400).json({
        data: null,
        meta: { message: 'Woops... Invalid credentials.' }
    });
}

module.exports.register = async (req, res) => {
    validation(req, res);

    const { name, email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
        return res.status(400).json({
            data: null,
            meta: { message: 'User already exists!' }
        });
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });

    return success(res, user);
}