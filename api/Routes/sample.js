const router = require('express').Router();
const express = require('express');
let { Public } = require('./db');
const app = express();
const check = require('../check-auth')
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const Validation = (Data) => {
    let messages = "";
    if (!Data.id) {
        return messages = "Data Id not provided"
    }
    if (!Data.title) {
        return messages = "Data title not provided"
    }
    if (!Data.description) {
        return messages = "Data description not provided"
    }
    else {
        return messages
    }
}

router.get("/sample", check, (req, res) => {
    console.log("sample")
    res.send(Public);
    if (req.status(400)) {
        console.log("GET 400")
    }

})
router.get("/list/:ID", (req, res) => {
    let id = parseInt(req.params.ID);
    let currentUser = Public.filter((list) => list.id == id)[0];
    if (currentUser) {
        res.status(200).json(currentUser);
    } else {
        res.sendStatus(404);
    }
});
router.get("/sample/:Id", check, (req, res) => {
    let id = parseInt(req.params.Id);
    let currentUser = Public.filter((p) => p.id === id)[0];
    if (currentUser) {
        res.json(currentUser)
    } else {
        res.status(404).json({
            "errors": [{ msg: "Sorry Your Not in Account" }]

        })
    }
})
router.post("/sample", check, (req, res) => {
    const Data = req.body;
    const Isvaliadte = Validation(Data);
    // console.log(Isvaliadte)
    if (Isvaliadte == "") {
        Public.push(Data);
        console.log(Data)
        res.json(Public)
        res.sendStatus(200)
    }
    else {
        res.statusMessage = "messages";
        res.status(400).send(Isvaliadte);
    }
})

router.put("/sample/:Id", check, (req, res) => {
    let id = parseInt(req.params.Id);
    const Data = req.body
    let currentUser = Public.filter((p) => p.id === id)[0];
    const Isvaliadte = Validation(Data);

    if (currentUser) {
        if (Isvaliadte == "") {
            currentUser.id = Data.id;
            currentUser.title = Data.title;
            currentUser.description = Data.description;
            res.status(200).send(Public)
        }
        else {
            return res.status(403).send(Isvaliadte)
        }
    }
    else {
        return res.status(403).send("User Not Found")

    }
})
router.delete("/sample/:Id", check, (req, res) => {
    let id = parseInt(req.params.Id);
    console.log("=-=-==-=-=-==data=-=-=-=-=", Public, id)
    let delted = Public.filter((p) => p.id === id)[0];
    let currentUser = Public.filter((p) => p.id !== id);
    Public = currentUser;
    console.log('id-->', id, currentUser, delted);
    if (delted) {
        res.status(200).send({ "message": "Student Deleted" })
    }
    else {
        res.status(404).send("User not found")
    }
})


module.exports = router