const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const requireAuth = async(req, res, next) => {

    //verify if user is authenticated
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(401).json({error: "Authorization token required"})
    }

    //authorization is in the form: bearer hasjkhfkjdkjshyrtlsjhf.shfjakghsd.skfhsjdfgh
    const token = authorization.split(' ')[1]

    //want to try verifying the token
    try {
        const { id } = jwt.verify(token, process.env.SECRET) //must destructure id cuz json is an object with multiple properties
        req.user = await User.findById(id).select('_id') //returns the id for the User with the given id
        next()

    } catch(error) {
        console.log(error)
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuth