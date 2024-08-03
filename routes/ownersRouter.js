const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let ownners = await ownerModel.find();
        if (ownners.length > 0)
            return res
                .status(503)
                .send("You don't have permission to create new owner.");

        let { fullname, email, password } = req.body;
        let createOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createOwner);
    });
}

router.get("/", (req, res) => {
    res.send("owner router");
});

module.exports = router;
