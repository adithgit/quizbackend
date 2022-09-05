const passport = require("passport");
const signJwt = require("../authentication/jwt");
const ConflictError = require("../errors/conflictError");
const NotFoundError = require("../errors/notFoundError");
const Admin = require('../models/admin');

exports.createAdmin = async (req, res, next) => {
    try {
        // Creating new user
        const admin = await Admin.create(req.body);

        return admin;
    } catch (e) {
        // Throwing an error if there is a user exist with same email
        if (e.keyValue && e.keyValue.email) return next(new ConflictError(`An account with email ${e.keyValue.email} aready exists!`, 'Conflict occured on user registration'));

        // Throwing an error if there is a user exist with same mobile number
        if (e.keyValue && e.keyValue.mobile) return next(new ConflictError(`An account with email ${e.keyValue.mobile} aready exists!`, 'Conflict occured on user registration'));

        // Passing error to error handler
        return next(e);
    }
};


exports.login = (req, res, next, done) => {
    passport.authenticate('adminLogin', (e, admin, response) => {
        try {
            if (e || !admin) throw new NotFoundError(e || response.message);
            // for private routes -> adding an admin parameter to token.
            admin = admin.toObject();
            admin.admin = true;

            // Creating new authentication token
            signJwt(req, admin, (e, token) => {
                if(e) return done(e);
                
                const auth = {
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    authToken: token
                }
                return done(null, auth);
            });

        } catch (e) {
            // Passing error to error handler
            return done(e);
        }
    })(req, res, next);
}