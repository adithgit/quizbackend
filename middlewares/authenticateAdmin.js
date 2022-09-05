const express = require("express");
const UnauthorizedError = require("../errors/unAuthorizedError");

const authenticateAdmin = (req, res, next) => {
    if (!req.user.admin) throw new UnauthorizedError();
    next();
}

module.exports = authenticateAdmin;