import {checkRequiredFields, userExist} from "../utils";
import {validPassword} from "../utils/security";
import {jwtTokenKey} from "../config";
import jwt from "jsonwebtoken";

export const checkDuplicate = (req, res, next) => {
    let checkErrors = checkRequiredFields(['email'], req.body);
    if (checkErrors.length) {
        return res.status(400).json({
            code: 400,
            status: "failed",
            message: `Missing required fields: ${checkErrors.toString()}`,
        });
    }
    userExist(req.body.email).then((user) => {
        if (user) {
            return res.send({
                success: false,
                message: "Email address already taken."
            })
        } else {
            next()
        }
    })
}

export const checkUser = (req, res, next) => {
    let checkErrors = checkRequiredFields(['email', 'password'], req.body);
    if (checkErrors.length) {
        return res.status(400).json({
            code: 400,
            status: "failed",
            message: `Missing required fields: ${checkErrors.toString()}`,
        });
    }
    userExist(req.body.email).then((user) => {
        if (user) {
            req.currentUser = user;
            let isValidPassword = validPassword(user.dataValues, req.body.password)
            if (isValidPassword)
                return next()
        }
        return res.send({
            success: false,
            message: `Invalid username and/or password`
        })
    })
}

export const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof (bearerHeader) !== "undefined") {
        const token = bearerHeader.split(" ")[1]
        const decodeData = jwt.decode(token, jwtTokenKey)
        try {
            if (Date.now() >= decodeData.exp * 1000) {
                res.sendStatus(403) // usertoken is expired already
            } else {
                const user = decodeData.dataValues
                userExist(user.email).then((user) => {
                    if (user) {
                        req.currentUser = user.dataValues;
                        return next()
                    }
                    return res.send({
                        success: false,
                        message: `Invalid username and/or password`
                    })
                })
            }
        } catch (err) {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(403)
    }
}