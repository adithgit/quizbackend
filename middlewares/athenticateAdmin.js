const UnauthorizedError = require("../errors/unAuthorizedError");

const authenticateAdmin = (req, res, next) => {
    try{
        if(req.user.admin != 'true') throw new UnauthorizedError("Admin access needed.");
        next();
    }catch(e){
        return res.status(401).send(e.toString());
    }

}

module.exports = authenticateAdmin;