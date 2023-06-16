"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileData = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// const DIR = "../client/public/images/";
const profileImg = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/Photo/Userprofilephoto");
    },
    filename: (req, file, cb) => {
        // console.log("file are",file)
        cb(null, file.originalname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
// Check File Type
const filefilter = (req, file, cb) => {
    //Allow ext
    const filetypes = /jpeg|jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLocaleLowerCase());
    //Check mime type
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb("Error: Image Only and Check File type!");
    }
};
const profileImgs = (0, multer_1.default)({ storage: profileImg, limits: { fileSize: 5000000 }, fileFilter: filefilter }).single("profilePicture");
// module.exports = { profileImgs };
exports.ProfileData = { profileImgs };
