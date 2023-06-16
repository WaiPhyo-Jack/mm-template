"use strict";

import multer from 'multer'
import { Request,Response } from 'express';
import path from 'path'

type FileData = {
    fieldname: string,
    originalname: string,
    mimetype : string,
    encoding: string
}

const Filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "projectImg") { // if uploading resume
      cb(null, "./public/Photo/projectPhoto");
    } else { // else uploading image
      cb(null, "./public/projectfiles");
    }
  },
    filename: (req, file, cb) => {
      // console.log("file are",file)
    cb(
      null,file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Check File Type
const fileFilter = (req:Request,file: FileData, cb : any) => {
  if (file.fieldname === "projectImg") { // if uploading resume
    const filetypes = /jpeg|jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
    //Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null,true)
    } else {
        cb("Error: Image Only and Check File type!")
    }
  } else { // else uploading image
    const filetypes = /zip/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
    //Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null,true)
    } else {
        cb("Error: Image Only and Check File type!")
    }
  }
};


const Projectupload = multer({ storage: Filestorage, limits:{fileSize:5000000}, fileFilter: fileFilter}).fields(
  [
    { 
      name: 'projectImg', 
      maxCount: 1 
    }, 
    { 
      name: 'projectFile', 
      maxCount: 1 
    }
  ]
);
// module.exports = { profileImgs };
export const ProjectimgData = {Projectupload}