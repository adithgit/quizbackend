const localStrategy = require("passport-local").Strategy;
const UnauthorizedError = require("../errors/unAuthorizedError");
const Admin = require("../models/admin");

const adminLocalStrategy = () => new localStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    async (email, password, done) => {
        try {
            if( !email || !password) return done('Email or password not defined');
            // Finding user with email
            const admin = await Admin.findOne({ email: email });

            // Throwing an error if there is no user with the provided email address
            if (!admin) throw new UnauthorizedError('User login unauthorized, account not found!', 'Unauthorized');

            // Checking password
            const valid = await admin.isValidPassword(password);

            // Throwing an error if the password is incorrect
            if (!valid) throw new UnauthorizedError('User login unauthorized, incorrect password!', 'Unauthorized');

            // Return user data
            return done(null, admin, { message: "Logged in Successfully" });
        } catch (e) {
            return done(e);
        }
    }
);

module.exports = adminLocalStrategy;