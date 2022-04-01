const JWT = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(400).json({
            "errors": [{ msg: "No Token Find" }]
        })
    }
    try {
        const user = JWT.verify(token, "kecbht5c456ch654e646");
        res.user = user.email;
        next();
    } catch {
        res.status(400).json({
            "errors": [{ msg: "Invalid User" }]
        })
    }

}