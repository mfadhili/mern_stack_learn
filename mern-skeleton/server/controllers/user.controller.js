import User from "../models/user.model";
import extend from 'lodash/extend'
import errorHandler from './error.controller'

// create new user within POST request , calls save() to mongoose db
const create =  async (req,res) => {
    const user = new User(req.body)
    try {
        await user.save() // updsyet db
        return res.status(200).json({message: 'Successfully signed up !'})
    } catch (err) {
        return res.status(400).json({error: errorHandler.getErrorMessage(err) // if it faild validations from mongo db 
        })
    }
}// had a bug here, await must go in hand with async
const list =  async (req,res) =>{
    try {
        let users = await User.find().select('name email udated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
        
    }
}

const userByID = async (req,res,next,id) => {
    try {
        let user = await User.findById(id)

        if (!user)
        return res.status(400).json({
            error: "User not found"
        })
        req.profile = user // user object is appended in profile key if it is found
        next() // propagate to next relevant controller function

    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve user"
        })        
    }
}

const read = (req, res) => {
    //retrieves user details then removes sensitive information
    req.profile.hashed_password = undefined 
    req.profile.salt = undefined
    return res.json(req.profile)
    
}

const update = async(req,res,next) => {
    try {
        let user = req.profile // retrieve user details 
        user = extend(user, req.body) // lodash to extend and merge the changes
        user.updated = Date.now()// timestamp
        await user.save()
        user.hashed_password = undefined // clean sensitive data before sending in response
        user.salt = undefined
        
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req,res,next) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove() // uses remove() query
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } 
    catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default {create, list, userByID, read, update, remove}
