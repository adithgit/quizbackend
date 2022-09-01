const jwt = require('jsonwebtoken');

const signJwt = (req, user, done) => {
    req.login(user, { session: false }, async (e) => {
        if (e) return done(e);

        // Signing new jwt
        const token = jwt.sign({ user }, "secretkey");

        return done(null, token);
    });
}

module.exports = signJwt;
