const adminServices = require("../services/admin");

exports.register = async (req, res, next) => {
    try {
        // has to send API key ie, adminKey in body of request
        if(req.body.adminKey != "adminKey") return res.status(401).send({message: 'adminKey invalid'});
        
        // Creating new admin
        await adminServices.createAdmin(req, res, (e) => {
            throw new Error(e)
        });

        // authenticate new admin
        adminServices.login(req, res, next, (e, admin) => {
            if (e) throw new Error(e);

            // Sending the new user as response
            res.status(201).json(admin);
        });
    } catch (e) {
        res.status(409).json(e.toString());
    }
}

exports.login = (req, res, next) => {
    // User authentication
    adminServices.login(req, res, next, (e, admin) => {
        try {
            if (e) throw new Error(e.toString())

            // Sending user data as response
            res.status(200).json(admin);
        } catch (e) {
            res.status(409).send(e.toString());
        }
    });
}

exports.getAuth = (req, res) => res.status(200).json({
    ...req.user,
    authToken: req.headers.authorization?.split(" ")[1]
});