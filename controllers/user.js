const userServices = require("../services/user");

exports.register = async (req, res, next) => {
    try {
        // Creating new user
        await userServices.createUser(req, res, (e) => {
            throw new Error(e)
        });

        // authenticate new user
        userServices.login(req, res, next, (e, user) => {
            if (e) throw new Error(e);

            // Sending the new user as response
            res.status(201).json({message: 'user created and logged in', data: user});
        });
    } catch (e) {
        res.status(409).json({message: e.toString()});
    }
}

exports.login = (req, res, next) => {
    // User authentication
    userServices.login(req, res, next, (e, user) => {
        try {
            if (e) throw new Error({message: e.toString()})

            // Sending user data as response
            res.status(200).json({message: 'login success', data: user});
        } catch (e) {
            res.status(409).send({message: e.toString()});
        }
    });
}

exports.getAuth = (req, res) => res.status(200).json({
    ...req.user,
    authToken: req.headers.authorization?.split(" ")[1]
});