
import express from 'express'
import {signupUser,Login} from '../controllers/userController.js';
const router = express.Router()

router.post("/signup", signupUser);
router.post("/login", Login);




export default router