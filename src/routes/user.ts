import express from "express";
import { ProfileData } from "../middleware/userimgmiddleware";
import { userInfo } from "../controller/user";
import protect from "../middleware/authmiddleware";
const router = express.Router();

router.get("/login", userInfo.getlogin);

router.get("/signup", userInfo.getsignup);

router.post("/signup", userInfo.postsignup);

router.post("/login", userInfo.postlogin);

router.get('/logout', userInfo.getLogout);

router.get('/edituser/:userid', userInfo.getedituser);

router.post('/edituser/:userid',ProfileData.profileImgs, userInfo.updateuser);

export default router;