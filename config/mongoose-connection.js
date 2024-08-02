const mongoose = require("mongoose");

const uri =
    "mongodb+srv://tnkiet0512:Zh6OvQlmARPOrvlx@project01.sgaeeet.mongodb.net/Scatch?retryWrites=true&w=majority&appName=project01";

mongoose
    .connect(uri)
    .then(() => {
        console.log("connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB Atlas: ", err);
    });

module.exports = mongoose.connection;
