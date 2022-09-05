const JWTstrategy = require("passport-jwt").Strategy;


// Same strategy for admin and user.
const userJwtStrategy = () => new JWTstrategy(
    {
        secretOrKey: "secretkey",
        jwtFromRequest: (req) => {
            let token = null;

            // Geting authentication Token from request headers
            if (req && req.headers) token = req.headers.authorization?.split(" ")[1];
            return token;
        },
    },
    async (token, done) =>{
        return done(null, token.user);
    }
);

module.exports = userJwtStrategy;