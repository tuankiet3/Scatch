const express = require("express")
const router = express.Router()
const isLogedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")

// page login and register
router.get("/", (req, res) => {
    let error = req.flash("error")
    res.render("index", { error })
})

// page show all product
router.get("/shop", isLogedIn, async (req, res) => {
    let products = await productModel.find()
    res.render("shop", { products })
})

module.exports = router
