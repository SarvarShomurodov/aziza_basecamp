import express from "express"
import mongoose from "mongoose"
import  cors from "cors";
import checkAuth from "./utils/checkAuth.js";
import validationErrors from "./utils/validationErrors.js";
import * as UserController from "./controllers/UserController.js"
import * as PostController from "./controllers/PostControllers.js"
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js"
const app = express();


mongoose.connect("mongodb+srv://admin:7B6iEI3hkvftms6s@cluster0.ho8sp9g.mongodb.net/basecamp?retryWrites=true")
.then(() => console.log("Connected to DB ..."))
.catch((error) => console.error("Error" + error));

app.use(express.json());
app.use(cors());

app.post("/login", loginValidation, validationErrors, UserController.login)
app.post("/sign_up", registerValidation, validationErrors, UserController.register);
app.get("/userinfo", checkAuth, UserController.userInfo);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, validationErrors, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id",checkAuth, postCreateValidation, validationErrors, PostController.update);

app.listen(4444, (err) =>{
    if (err) return console.log(err);
})