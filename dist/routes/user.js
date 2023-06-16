"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userimgmiddleware_1 = require("../middleware/userimgmiddleware");
const user_1 = require("../controller/user");
const router = express_1.default.Router();
router.get("/login", user_1.userInfo.getlogin);
router.get("/signup", user_1.userInfo.getsignup);
router.post("/signup", user_1.userInfo.postsignup);
router.post("/login", user_1.userInfo.postlogin);
router.get('/logout', user_1.userInfo.getLogout);
router.get('/edituser/:userid', user_1.userInfo.getedituser);
router.post('/edituser/:userid', userimgmiddleware_1.ProfileData.profileImgs, user_1.userInfo.updateuser);
exports.default = router;
