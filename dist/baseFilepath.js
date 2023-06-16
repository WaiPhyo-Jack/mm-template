"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// var fileDetail = "react-app/testserver.js";
var fileDetail = __dirname;
// var filePathReq = "myanfobasefull/react-app/client/public/images";
const pathMain = path_1.default.dirname(fileDetail);
// const pathMain = path.basename(filePathReq);
// console.log("file path is ", pathMain);
exports.default = pathMain;
