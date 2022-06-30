import  User  from "../models/user.model";
import  jwt  from "jsonwebtoken";
import  {expressjwt }  from "express-jwt"; // had to import as per official documentation  as seen here
import  config  from "./../../config/config";

// the post request recieves emaila dn password in req.body. 
const signin = async (req,res) => {
    try {
        let user = await User.findOne({"email": req.body.email})

        if (!user) {
            return res.status(401).json({error: "User not found"})
        }
        //authenticate method from userschema model (SUSPECTING Bug here)
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({error: "Email or PAssword dont match."})
        }
            // generate signed jwt using secrete key and users id value -jwt module
        const token = jwt.sign({_id: user_id}, config.jwtSecret)

        res.cookie('t', token, {expire: new Date() + 9999}) // set token to cookie in response object , authorization header setting in client side 

        //return signed jwt to authenticated client along with user details. 
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.emil
            }
        })
    } catch (err) {
        return res.status(401).json({error: "Could not sign in"})
    }
}

const signout = (req,res) =>{
    res.clearCookie('t') // clears response cookie containing the signed jwt
    return res.status('200').json({
        message: 'signed out'
    })
    //not mandatory unless cookies are used
}

// authentication: verify if token is valid authorisation, otherwise it throws and authentication error
const requireSignin = expressjwt({
    secret: config.jwtSecret,
    useProperty: 'auth',
    algorithms: ['RS256'] // had to add algorithms property in jwt constructor
})

// checks authorisation
const hasAuthorization = (req,res, next) => {
    const authorised = req.profile && req.auth && req.profile._id == req.auth._id // req.auth is populated by express-jwt while req.profile is populated by userById function in user.controller.js
    if(!(authorised)){
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()

}

export default {signin, signout, requireSignin, hasAuthorization }

