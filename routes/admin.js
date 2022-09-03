const express = require('express');
const router = express.Router();


const authenticate = (req, res, next)=>{
    if(!req.body.admin) return res.status(403).send('not admin');
    next();
}

router.get('/',  authenticate, (req, res)=>{
    res.status(200).send("admin")
})


module.exports = router;
