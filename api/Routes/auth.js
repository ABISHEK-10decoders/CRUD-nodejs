const router = require('express').Router();
const { check, validationResult } = require("express-validator");
const { users } = require("./db")
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")
router.post('/signup', [
    check("name"),
    check("password", "Must have 6 characters").isLength({
        min: 6
    }),
    check("email", "Please enter your email address".toLowerCase())
], async (req, res) => {
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
        res.status(400).json({
            "errors": [{ msg: "Invalid" }]
        })
    }

    let NotMatch = await bcrypt.compare(password, USER.password);
    if (!NotMatch) {
        return res.status(400).json({
            errors: [{ msg: "Invalid  Credentials" }]
        })
    }
    const token = await JWT.sign({ email }, "kecbht5c456ch654e646", { expiresIn: 2000 })
    res.json({ token })
    // const token = await JWT.sign({ email }, "kecbht5c456ch654e646", { expiresIn: 2000 });


})
router.get('/all', (req, res) => {
    res.json(users);

})



module.exports = router