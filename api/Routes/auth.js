const router = require('express').Router();
const { check, validationResult } = require("express-validator");
const { users } = require("./db")
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")
router.post('/signup', async (req, res) => {
    // res.send("Auth Sent")
    const { name, password, email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    let USER = users.find((use) => use.email === email)
    if (USER) {
        res.status(400).json({
            "errors": [{ msg: "Email Already Exists" }]
        })
    }
    console.log("Validated !!!");
    let hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword)

    // res.send("working")
    users.push(
        {
            email,

            password: hashPassword
        }

    )
    const token = await JWT.sign({ email }, "kecbht5c456ch654e646", { expiresIn: 2000 });

    res.json({
        token
    })


})
router.post('/login', async (req, res) => {
    const { name, password, email } = req.body;
    let USER = users.find((use) => use.email === email)
    if (!USER) {
        res.status(401).json({
            "errors": [{ msg: "Invalid token error", success: false }]
        })
    }

    let NotMatch = await bcrypt.compare(password, USER.password);
    if (!NotMatch) {
        return res.status(400).json({
            errors: [{ msg: "Invalid  Credentials" }]
        })
    }
    const token = await JWT.sign({ email }, "kecbht5c456ch654e646", { expiresIn: "10m" })
    const refreshToken = await JWT.sign({ email }, "HELLOHELLO", { expiresIn: "1h", })

    res.json({ token, refreshToken })
    // const token = await JWT.sign({ email }, "kecbht5c456ch654e646", { expiresIn: 2000 });

})
router.post("/refresh", (req, res) => {
    const { refreshToken } = req.body;
    console.log(refreshToken)
    let decode = JWT.decode(refreshToken);
    console.log(decode.email)
    let email = decode.email
    // return refreshToken
    // console.log(email, "++++++++++++++++++ email")
    if (email === users.email) {
        const token = JWT.sign({ email }, "kecbht5c456ch654e646", { expiresIn: "10m" })
        return res.json(token, refreshToken);

    }
    // else {
    //     res.json(null, refreshTokens);
    // }
})


router.get('/all', (req, res) => {
    res.json(users);

})



module.exports = router