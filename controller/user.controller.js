import {generatePassword} from "../utils/security";
import {Users} from "../model/user.model";
import {checkRequiredFields} from "../utils";
import * as jwt from 'jsonwebtoken';
import {jwtTokenKey} from "../config";


export const registerUser = (req,res) => {
    try{
        const props = req.body;
        let requiredFields = [
            'name',
            'age',
            'password',
            'email'
        ]
        let checkErrors = checkRequiredFields(requiredFields, props) //check if all required fields exist
        if(checkErrors.length)
            throw Error(`Missing required fields: ${checkErrors.toString()}`)

        const {salt, hash} = generatePassword(props.password); // create salt and hash for user password
        Users.create({ // register new user
            name: props.name,
            age: props.age,
            email: props.email,
            password: salt,
            hash: hash,
            created_at: new Date(),
            updated_at: new Date(),
        }).then((result) => {
            // creating new user success
            res.send({
                success: true
            })
        }).catch((error) => {
            // an error happened when creating a new user
            res.status(400).json({
                code: 400,
                status: "failed",
                message: "An error has occurred, please try again or contact administrator/support.",
            });
        })
    }catch (e) {
        res.status(400).json({
            code: 400,
            status: "failed",
            message: e.message,
        });
    }
}

export const loginUser = (req,res) => {
    try{
        const token = jwt.sign({...req.currentUser}, jwtTokenKey); //generate token for the logged-in user
        res.send({
            success: true,
            token
        })
    }catch (e) {
        res.status(400).json({
            code: 400,
            status: "failed",
            message: e.message,
        });
    }
}