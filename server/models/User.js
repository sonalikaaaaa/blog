const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const Schema = new mongoose.Schema;
const secretKey = "qwertyuiopasdfghjklzxcvbnmqwerty"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    fullname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    profilePic: {
        type: String
    },
    bio: {
        type: String,
        default: "The User Is New To The Platform",
    },
    instagram: {
        type: String,
    },
    twitter: {
        type: String,
    },
    facebook: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    bookmarks: {
        type: Array,
        default: [],
    },
    tokens: [
        {
            token: {type: String}
            //required: true
        }
    ]
})

//password hashing
userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,12)
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let token1 = jwt.sign({_id: this._id},secretKey);
        this.tokens = this.tokens.concat({token: token1})
        await this.save();
        return token1;
    }
    catch(error) {
        console.log("error in token generation", error);
    }
}

const User = mongoose.model("User", userSchema)
module.exports = User;
//mongoose.exports = mongoose.model("Users",userSchema)