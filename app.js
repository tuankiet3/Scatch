const express = require("express")
const app = express()
const port = 3000

// import external
const path = require("path")
const cookieParser = require("cookie-parser")
require("dotenv").config()

// import internal
require("./config/mongoose-connection")
const index = require("./routes/index")
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")
const session = require("express-session")
const flash = require("connect-flash")

app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    })
)

app.use(flash())

// use
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set("view engine", "ejs")

// use router
app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)
app.use("/", index)

// running
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// shop -> shop
// users/card -> card
// admin -> admin
// owner/products -> show all products
// owner/admin -> show admin panel create product
