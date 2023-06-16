"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectimgData = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const Filestorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "projectImg") { // if uploading resume
            cb(null, "./public/Photo/projectPhoto");
        }
        else { // else uploading image
            cb(null, "./public/projectfiles");
        }
    },
    filename: (req, file, cb) => {
        // console.log("file are",file)
        cb(null, file.originalname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
// Check File Type
const fileFilter = (req, file, cb) => {
    if (file.fieldname === "projectImg") { // if uploading resume
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
    }
    else { // else uploading image
        const filetypes = /zip/;
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
    }
};
const Projectupload = (0, multer_1.default)({ storage: Filestorage, limits: { fileSize: 5000000 }, fileFilter: fileFilter }).fields([
    {
        name: 'projectImg',
        maxCount: 1
    },
    {
        name: 'projectFile',
        maxCount: 1
    }
]);
// module.exports = { profileImgs };
exports.ProjectimgData = { Projectupload };
