const userServices = require("../services/user");

exports.register = async (req, res, next) => {
    try{
        // Creating new user
        await userServices.createUser(req, res, (e)=>{
            throw new Error(e)
        });
        
        // authenticate new user
        userServices.login(req, res, next, (e, user) => {
            if (e) throw new Error(e);
            
            // Sending the new user as response
            res.status(201).json(user);
        });
    }catch(e){
        res.status(409).json(e.toString());
    }
}

exports.login = (req, res, next) => {
    // User authentication
    try{
        userServices.login(req, res, next, (e, user) => {
            if (e) throw new Error(e);
    
            // Sending user data as response
            res.status(200).json(user);
        });
    }
    catch(e){
        res.status(409).json(e.toString());
    }
}

exports.getAuth = (req, res) => res.status(200).json({
    ...req.user,
    authToken: req.headers.authorization?.split(" ")[1]
});


// exports.adminLogin = (req, res, next) => {
//     try {
//         userServices.adminLogin(req, res, next, (e, user) =>{
//             if(e) throw new Error("admin login failed");

//             res.status(200).json(user);
//         })
//     } catch (e) {
//         res.status(409).json(e.toString());
//     }
// }