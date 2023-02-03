import {body} from "express-validator"

export const registerValidation = [
    body("name", "Specify the fullname!").isLength({min: 3}),
    body("email", "Invalid email format!").isEmail(),
    body("password", "Password must be at least 5 characters!").isLength({min: 5}),
]

export const loginValidation = [
    body("email", "Invalid email format!").isEmail(),
    body("password", "Password must be at least 5 characters!").isLength({min: 5}),
]

export const postCreateValidation = [
    body("title", "Please, enter project title!").isLength({min: 3}).isString(),
    body("text", "Please, enter project text!").isLength({min: 3}).isString()
]