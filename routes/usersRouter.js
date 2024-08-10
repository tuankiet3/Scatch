const express = require("express")
const router = express.Router()

// import internal
const { register, login, logout } = require("../controllers/authController")
const isLoggedIn = require("../middlewares/isLoggedIn")

// [GET] '/users'
router.get("/", isLoggedIn, (req, res) => {
    res.send("user router")
})

// [POST] '/users/register'
router.post("/register", register)

// [POST] '/users/login'
router.post("/login", login)

// [GET] 'users/logout'
router.get("/logout", isLoggedIn, logout)

module.exports = router
