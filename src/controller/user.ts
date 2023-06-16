import jwt from "jsonwebtoken";
import fs from "fs";
import mainPath from "../baseFilepath";
import User from "../models/user";
import bcrypt from "bcryptjs";
import path from "path";
import { NextFunction, Request, Response, json } from "express";
import { ObjectId } from "mongoose";
import session, { Session, SessionData } from 'express-session';
import Project from "../models/project";

interface CustomSessionData extends SessionData {
  user?: {
    _id: ObjectId;
    username: string;
    email: string;
    login: boolean;
    isadmin: boolean;
    token: string;
  };
}

declare module 'express-session' {
  interface Session extends CustomSessionData {}
}


export interface RequestData {
  id: ObjectId;
  username: string;
  email: string;
  password: string;
  login: Boolean;
  isadmin: boolean;
  profilePicture: Array<ProfileData | null>;
}

export type ProfileData = {
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: string;
};

const getlogin = async (req: Request, res: Response): Promise<void> => {
    try {
        res.render('login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
      });
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting login!",
      });
    }
  };
  
  const getsignup = async (req: Request, res: Response): Promise<void> => {
    try {
        res.render('signup', {
        pageTitle: 'Signup',
        path: '/signup',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
      });
    } catch (error) {
        res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting signup!",
      });
    }
  };

  const getedituser  = async (req: Request, res: Response): Promise<void> => {
    try {
      const U_id = req.params.userid;
      User.findById(U_id)
        .then(userInfo =>{
        res.render('edituser', {
        User: userInfo,
        pageTitle: userInfo?.get('username'),
        path: '/edituser',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
    })
  })
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting content!",
      });
    }
  };

  const postsignup = async (req: Request, res: Response) => {
    try {
      let { username, email, password }: RequestData = req.body;
  
      username = username.trim();
      email = email.trim();
      password = password.trim();
  
      if (!username || !email || !password) {
        return res.status(404).json({
          status: "FAILED",
          message: "Empty input Fields!",
        });
      }
  
      //checking user name
      if (!/^[a-zA-Z ]*$/.test(username)) {
        return res.status(400).json({
          status: "FAILED",
          message: "Invalid name entered",
        });
      }
  
      //checking email
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.status(400).json({
          status: "FAILED",
          message: "Invalid email entered",
        });
      }
      //checking password length
      if (password.length < 8) {
        return res.status(400).json({
          status: "FAILED",
          message: "Password is too short!",
        });
      }
  
      //find user email from database
      await User.find({ email })
        .then((result) => {
          if (result.length) {
            //A user already exits
            return res.status(400).json({
              status: "FAILED",
              message: "User with the provided email already exists",
            });
          }
          //to create a new user
          //password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                username,
                email,
                password: hashedPassword,
              });
              newUser
                .save()
                .then((result) => {
                  //res.status(201).json(result);
                  res.render("login",{isAuthenticate: req.session.user?.login,userid : req.session.user?._id,isadmin : req.session.user?.isadmin});
                })
                .catch((err) => {
                  res.status(400).json({
                    status: "FAILED",
                    message: "An error occurred while saving user account!",
                  });
                });
            })
            .catch((err) => {
              res.status(400).json({
                status: "FAILED",
                message: "An error occurred while hashing password!",
              });
            });
        })
        .catch((err) => {
          res.status(400).json({
            status: "FAILED",
            message: "An error occured while checking for existing user!",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const postlogin = async (req: Request, res: Response) => {
    try {
      let { email, password }: RequestData = req.body;
      email = email.trim();
      password = password.trim();
  
      if (email == "" || password == "") {
        return res.status(400).json({
          status: "FAILED",
          message: "Empty credentials supplied",
        });
      }
  
      /* Check for user email*/
      const user: RequestData | null = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user ={
          _id: user.id,
          username: user.username,
          email: user.email,
          login: true,
          isadmin: user.isadmin,
          token: generateToken(user.id),
        };
          User.updateOne({ _id: user.id }, { login: true });
          Project.find()
            .then((projects) => {
              console.log('session', req.session.user);
              // res.render('index', { user: req.session.user })
              res.render('index',{ 
                projs: projects,
                pageTitle: 'Home',
                path: '/',
                isAuthenticate: req.session.user?.login,
                userid : req.session.user?._id,
                isadmin : req.session.user?.isadmin
            })
        })
        .catch((err) => {
          res.status(400).json({
            status: "FAILED",
            message: "An error occur while updating login data update",
          });
        });
    } else {
        res.status(400).json({
          status: "FAILED",
          message: "Email, Password is something wrong",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  /*Generate JWT */
  export const generateToken = (id: ObjectId | object) => {
    return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "30d",
    });
  };

  const getLogout = async (req: Request, res: Response): Promise<void> => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      // Redirect the user to the desired page after logout
      res.render('login',{isAuthenticate: false, userid : null});
    });
  }

  const updateuser = async (req: Request, res: Response) => {
    try {
      let { username } : RequestData = req.body;
      const  id  = req.params.userid;
      
      const profilePicture = req.file;
      
      const UserDetail: any = await User.findById(id);
  
      /* Check for user */
      if (!UserDetail) {
        return res.status(404).json({
          status: "FAILED",
          message: "user not found",
        });
      }

      if (!username) {
        return res.status(404).json({
          status: "FAILED",
          message: "Empty input Fields!",
        });
      }

      let filesArray = [];
      if(profilePicture){
        if (profilePicture !== undefined && profilePicture !== null) {
          const file = {
            fileName: profilePicture.filename,
            filePath: profilePicture.path,
            fileType: profilePicture.mimetype,
            fileSize: fileSizeFormatter(profilePicture.size, 2),
          };
          filesArray.push(file);
          if ((
            UserDetail.profilePicture[0] !== undefined ||
            UserDetail.profilePicture.length !== 0)&& UserDetail.profilePicture[0] !== null
          ) {
            //for Image File to when when we do update picture
            fs.unlink(
              path.join(mainPath, UserDetail.profilePicture[0].filePath),
              (err) => {
                if (err) {
                  return console.log("error occur", err);
                }
                // console.log("file is deleted successully");
              }
            );
          }
        }
      }else{
        filesArray.push(UserDetail.profilePicture[0]);
      }
      
        //update project
        await User.updateMany(
          { _id: id },
          {
            $set: {
              username: username,
              profilePicture : filesArray,
            },
          }
        ); 
        Project.find()
        .then((projects)=>{
          res.render('index',{
            projs: projects,
            pageTitle: 'Home',
            path: '/',
            isAuthenticate: req.session.user?.login,
            userid : req.session.user?._id,
            isadmin : req.session.user?.isadmin
            });
        })  
    } catch (error) {
      console.log(error);
    }
  };

  const fileSizeFormatter = (bytes: number, decimal: number): string => {
    if (bytes === 0) {
      return "0 byte";
    }
    const dm: number = decimal || 2;
    const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index: number = Math.floor(Math.log(bytes) / Math.log(1000));
    return (
      parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]
    );
  };

  export const userInfo = {
    getlogin,
    postsignup,
    getsignup,
    postlogin,
    getLogout,
    updateuser,
    getedituser
  };
  