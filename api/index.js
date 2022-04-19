const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator");
const auth = require('./Routes/auth');
const bcrypt = require('bcrypt');
const sample = require('./Routes/sample')
require("dotenv").config();

const cors = require('cors');

// app.use(cors({
//     cors: {
//         origin: '*'
//     }
// }));

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use("/auth", auth);
app.use("/public", sample)
let port = process.env.MAIN_PORT;


// app.options('*', cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     optionSuccessStatus: 200
// }));
// const User = [
//     {
//         id: 1,
//         name: "john",
//         password: "John2525",
//         isAdmin: true,
//     },                                                                                                        
//     {
//         id: 2,
//         name: "Geroge",
//         password: "Geroge25",
//         isAdmin: false
//     }
// ]eyJlbWFpbCI6Ind3d3cuY29tIiwiaWF0IjoxNjQ5MDQ4NTk5LCJleHAiOjE2NDkwNTA1OTl9

app.get("/", (req, res) => {
    res.send(`hello welcome to PORT ${port}`)

});


// app.post("/api/login", [
//     check("password", "password length must be greater than 6").isLength({
//         min: 6
//     }),
//     check("name", "name must have lowercases").isLowercase()
// ], async (req, res) => {
//     // res.send("login working in postman...")
//     // console.log(email, "Email", password, "Password")

//     const { name, password } = req.body;
//     const users = User.find(user => user.name === name && user.password === password)
//     if (users) {
//         // return res.json(users)
//         const accesToken = jwt.sign({ id: users.id, isAdmin: users.isAdmin }, "keyValue");
//         res.json({ username: users.name, password: users.password, accesToken })
//     }
//     else {
//         // return res.status(400).json("User not found")
//     }

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             errors: errors.array()
//         })
//     }

//     const hashPass = await bcrypt.hash(password, 10);
//     console.log(hashPass)
//     res.send("Signup working!!");

// })

app.listen(3002, () => console.log(`server up at http://localhost:${port}/`));