//import external
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken")

// import internal
const userModel = require("../models/user-model")

module.exports.register = async (req, res) => {
    try {
        let { fullname, password, email } = req.body

        if (email === "" || password === "") {
            req.flash("error", "Enter complete information")
            return res.redirect("/")
        }

        let user = await userModel.findOne({ email })
        if (user) {
            req.flash("error", "User already exists, please login.")
            return res.redirect("/")
        }

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)

                // Create user
                user = await userModel.create({
                    email,
                    password: hash,
                    fullname,
                })

                // JWT
                let token = generateToken(user)
                res.cookie("token", token)
                req.flash("success", "Registration successful.")
                return res.redirect("/")
            })
        })
    } catch (error) {
        req.flash("error", error.message)
        res.redirect("/")
    }
}

module.exports.login = async (req, res) => {
    let { email, password } = req.body
    let user = await userModel.findOne({ email })

    if (!user) {
        req.flash("error", "Email or password is incorrect")
        return res.redirect("/")
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.send("login error: ", err)

        if (result) {
            let token = generateToken(user)
            res.cookie("token", token)
            return res.redirect("/shop")
        } else {
            req.flash("error", "Password is incorrect")
            return res.redirect("/")
        }
    })
}

module.exports.logout = async (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
}
