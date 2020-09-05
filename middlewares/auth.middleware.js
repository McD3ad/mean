const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, process.env.APP_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({
                data: null,
                meta: { message: 'Token was expire.' }
            });
        }

        req.user = user;
        next();
    });
}