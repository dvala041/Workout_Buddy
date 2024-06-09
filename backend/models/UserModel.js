const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static login method
userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error ("All fields must be filled")
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error("Email doesn't exist")
    }

    //compare the password passed in the post request and the password associated with the email
    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("Incorrect password")
    }

    return user
}

//static signup method
userSchema.statics.signup = async function(email, password){
    
    //validation
    if(!email || !password) {
        throw Error ("All fields must be filled")
    }

    if(!validator.isEmail(email)) {throw Error("Not a valid email")}

    if(!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

    //check if email is database; if it is we don't even wanna try to add it (this is an extra layer of making sure)
    const exists = await this.findOne({email})

    if(exists) { throw Error("Email already in use")}

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})
    return user
}

module.exports = mongoose.model("User", userSchema)