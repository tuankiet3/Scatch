const mongoose = require("mongoose");
const debug = require("debug")("development:mongoose");
const config = require("config");

mongoose
    .connect(config.get("MONGOOSE_URI"))
    .then(() => {
        debug("connected to MongoDB Atlas");
        console.log("connected to MongoDB Atlas");
    })
    .catch((err) => {
        debug("Error connecting to MongoDB Atlas: ", err);
        console.log("Error connecting to MongoDB Atlas: ", err);
    });

module.exports = mongoose.connection;
