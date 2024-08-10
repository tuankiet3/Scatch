const express = require("express")
const router = express.Router()
const isLogedIn = require("../middlewares/isLoggedIn")
const upload = require("../config/multer")
const productModel = require("../models/product-model")

// [POST] //create
router.post("/create", isLogedIn, upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount } = req.body

        let product = await productModel.findOne({ name })

        if (product) {
            req.flash("error", "Product already exists")
            return res.redirect("/owners/admin")
        }

        // eslint-disable-next-line no-unused-vars
        product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
        })

        req.flash("success", "Product created successfully")

        res.redirect("/owners/admin")
    } catch (err) {
        req.flash("error", err)
    }
})
module.exports = router
