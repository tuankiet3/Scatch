const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

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

const useSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: [],
    },
    isadmin: boolean,
    orders: {
        type: Array,
        default: [],
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model("user", useSchema);
