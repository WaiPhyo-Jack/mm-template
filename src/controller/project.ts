import mainPath from "../baseFilepath";
import bcrypt from "bcryptjs";
import Project from "../models/project";
import { NextFunction, Request, Response } from "express";
import { ObjectId, Document } from "mongoose";
import fs from "fs";
import path from "path";
import { request } from "http";
import { log } from "console";
import { ProjectimgData } from "../middleware/projectimgmiddleware";
import isLoggedIn from "../middleware/iflogin";

export interface RequestData {
    id: ObjectId;
    project_name: string;
    category: string;
    price: string;
    projectImg: Array<ProjectimgData>;
    projectFile: Array<ProjectfileData>;
    description: string;
    tech_description: string;
  }
  
  interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  }
  

  export type ProjectimgData = {
    fileName: string;
    filePath: string;
    fileType: string;
    fileSize: string;
  };

  export type ProjectfileData = {
    fileName: string;
    filePath: string;
    fileType: string;
    fileSize: string;
  };

  const getindex  = async (req: Request, res: Response): Promise<void> => {
    try {
      Project.find()
      .then(projects =>{
        res.render('index', {
          projs: projects,
          pageTitle: 'Home',
          path: '/',
          isAuthenticate: req.session.user?.login,
          userid : req.session.user?._id,
          isadmin : req.session.user?.isadmin
        });
      })
      
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting index!",
      });
    }
  };

  const getTerms  = async (req: Request, res: Response): Promise<void> => {
    try {
      res.render('TermsandConditions', {
        pageTitle: 'TermsandConditions',
        path: '/TermsandConditions',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
      })
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting Terms and Conditions!",
      });
    }
  };

  const getAbout  = async (req: Request, res: Response): Promise<void> => {
    try {
      res.render('about', {
        pageTitle: 'About',
        path: '/about',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
      })
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting about!",
      });
    }
  };

  const getShop  = async (req: Request, res: Response): Promise<void> => {
    try {
      Project.find()
        .then(projects =>{
        res.render('shop', {
        projs: projects,
        pageTitle: 'shop',
        path: '/shop',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
    })
      })
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting shop!",
      });
    }
  };

  const getcontant  = async (req: Request, res: Response): Promise<void> => {
    try {
      res.render('contact', {
        pageTitle: 'Contact',
        path: '/contact',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
      })
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting content!",
      });
    }
  };

  const getBlog  = async (req: Request, res: Response): Promise<void> => {
    try {
      res.render('blog', {
        pageTitle: 'Blog',
        path: '/blog',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
      });
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting content!",
      });
    }
  };

  const getAddproject  = async (req: Request, res: Response): Promise<void> => {
    try {
      res.render('project_add', {
        pageTitle: 'Add Project',
        path: '/project_add',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
      });
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting content!",
      });
    }
  };

  const getEdit  = async (req: Request, res: Response): Promise<void> => {
    try {
      Project.find()
        .then(projects =>{
        res.render('edit', {
        projs: projects,
        pageTitle: 'Edit',
        path: '/edit',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
      });
    })
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting content!",
      });
    }
  };

  const getSingleproject  = async (req: Request, res: Response): Promise<void> => {
    try {
      const projId = req.params.projectId;
      Project.findById(projId)
        .then((project) =>{
        res.render('shopsingle', {
        project: project,
        pageTitle: project?.get('project_name'),
        path: '/shopsingle',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
        });
      })
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting content!",
      });
    }
  };

  const getSingleprojectsell  = async (req: Request, res: Response): Promise<void> => {
    try {
      if(req.session.user?.login == true){
      const projId = req.params.projectId;
      Project.findById(projId)
        .then(project =>{
        res.render('shopsinglesell', {
        project: project,
        pageTitle: project?.get('project_name'),
        path: '/shopsinglesell',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
    });
  })
    }else{
      res.send('<script>alert("Please log in to view this page."); window.location.href = "/login";</script>');
    }
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting content!",
      });
    }
  };

  const getProject_edit  = async (req: Request, res: Response): Promise<void> => {
    try {
      const projId = req.params.projectId;
      
      Project.findById(projId)
        .then(project =>{
        res.render('project_edit', {
        project: project,
        pageTitle: project?.get('project_name'),
        path: '/project_edit',
        isAuthenticate: req.session.user?.login,
        userid : req.session.user?._id,
        isadmin : req.session.user?.isadmin
    });
  })
    } catch (error) {
      res.status(400).json({
        status: "FAILED",
        message: "An error occurred while getting content!",
      });
    }
  };

  const deleteProject = async (req: Request, res: Response) => {
    try {
      const projId = req.params.projectId;
      const ProjectDetail: RequestData | null = await Project.findById(projId);
      
      /* Check for user */
      if (!ProjectDetail) {
        return res.status(404).json({
          status: "FAILED",
          message: "user not found",
        });
      }
      ProjectDetail.projectImg[0] === null ||
      ProjectDetail.projectImg.length <= 0
        ? console.log("file is empty file")
        : fs.unlink(
            path.join(mainPath, ProjectDetail.projectImg[0].filePath),
            (err) => {
              // return fs.unlink(path.join(data.filePath), (err) => {
              if (err) {
                return console.log("error occur", err);
              }
              // console.log("file is deleted successully");
            }
          );
          ProjectDetail.projectFile[0] === null ||
          ProjectDetail.projectFile.length <= 0
            ? console.log("file is empty file")
            : fs.unlink(
                path.join(mainPath, ProjectDetail.projectFile[0].filePath),
                (err) => {
                  // return fs.unlink(path.join(data.filePath), (err) => {
                  if (err) {
                    return console.log("error occur", err);
                  }
                  // console.log("file is deleted successully");
                }
              );
  
      await Project.findByIdAndRemove(projId).exec();
    res.status(200).render('/edit',{isAuthenticate: req.session.user?.login,userid : req.session.user?._id,isadmin : req.session.user?.isadmin});
      // res.send();
    } catch (error) {
      console.log(error);
    }
  };

  const postaddproject = async (req: Request, res: Response) => {
  try {
    let { project_name, category, price, description, tech_description } : RequestData = req.body;

    const uploadfile = req.files;

    const {projectImg, projectFile} : any = uploadfile;

    if (!project_name || !category || !description || !tech_description || !projectImg || !projectFile) {
      return res.status(404).json({
        status: "FAILED",
        message: "Empty input Fields!",
      });
    }

    //find user email from database
    await Project.find({ project_name })
      .then((result) => {
        if (result.length) {
          //A user already exits
          return res.status(400).json({
            status: "FAILED",
            message: "Project with the provided name already exists",
          });
        }

        let imgfilesArray = [];
        const imgfile = {
          fileName: projectImg[0].filename,
          filePath: projectImg[0].path,
          fileType: projectImg[0].mimetype,
          fileSize: fileSizeFormatter(projectImg[0].size, 2),
        };
        imgfilesArray.push(imgfile);

        let projfilesArray = [];
        const projfile = {
          fileName: projectFile[0].filename,
          filePath: projectFile[0].path,
          fileType: projectFile[0].mimetype,
          fileSize: fileSizeFormatter(projectFile[0].size, 2),
        };
        projfilesArray.push(projfile);

        const project = new Project({
          project_name: project_name,
          category: category,
          price: price,
          projectImg: imgfilesArray,
          projectFile: projfilesArray,
          description: description,
          tech_description: tech_description
        });
        project
          .save()
          .then(result => {
            // console.log(result);
            //console.log('Created Project');
            res.render('/project_add',{isAuthenticate: req.session.user?.login,userid : req.session.user?._id,isadmin : req.session.user?.isadmin});
          })
          .catch((_err) => {
            res.status(400).json({
              status: "FAILED",
              message: "An error occurred while uploading project",
            });
          });
      })
      .catch((_err) => {
        res.status(400).json({
          status: "FAILED",
          message: "An error occurred while checking for an existing Project!",
        });
      });
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

  const updateproject = async (req: Request, res: Response) => {
    try {
      let { project_name, category, price, description, tech_description } : RequestData = req.body;
      const  id  = req.params.projectId;
      
      const uploadfile = req.files;
      
      const ProjectDetail: any = await Project.findById(id);
  
      /* Check for user */
      if (!ProjectDetail) {
        return res.status(404).json({
          status: "FAILED",
          message: "user not found",
        });
      }

      if (!project_name || !category || !description || !tech_description) {
        return res.status(404).json({
          status: "FAILED",
          message: "Empty input Fields!",
        });
      }

      let imgfilesArray = [];
      let projectfilesArray = [];
      if(uploadfile){
        const {projectImg, projectFile} : any = uploadfile;

        if(projectImg){
          if (projectImg !== undefined && projectImg !== null) {
            const imgfile = {
              fileName: projectImg[0].filename,
              filePath: projectImg[0].path,
              fileType: projectImg[0].mimetype,
              fileSize: fileSizeFormatter(projectImg[0].size, 2),
            };
          imgfilesArray.push(imgfile);
  
          if (
            ProjectDetail.projectImg[0] !== undefined ||
            ProjectDetail.projectImg.length !== 0
          ) {
          //for Image File to when when we do update picture
          fs.unlink(
            path.join(mainPath, ProjectDetail.projectImg[0].filePath),
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
        imgfilesArray.push(ProjectDetail.projectImg[0]);
      }

      if(projectFile){
        if (projectFile !== undefined && projectFile !== null) {
          const projfile = {
            fileName: projectFile[0].filename,
            filePath: projectFile[0].path,
            fileType: projectFile[0].mimetype,
            fileSize: fileSizeFormatter(projectFile[0].size, 2),
          };
          projectfilesArray.push(projfile);
          if (
            ProjectDetail.projectFile[0] !== undefined ||
            ProjectDetail.projectFile.length !== 0
          ) {
            //for Image File to when when we do update picture
            fs.unlink(
              path.join(mainPath, ProjectDetail.projectFile[0].filePath),
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
        projectfilesArray.push(ProjectDetail.projectFile[0]);
      }
    }else{
      projectfilesArray.push(ProjectDetail.projectFile[0]);
      imgfilesArray.push(ProjectDetail.projectImg[0]);
    }
        //update project
        await Project.updateMany(
          { _id: id },
          {
            $set: {
              project_name: project_name,
              category : category,
              price : price,
              description : description,
              tech_description : tech_description,
              projectImg: imgfilesArray,
              projectFile: projectfilesArray
            },
          }
        ); 
        res.render('/edit',{isAuthenticate: req.session.user?.login,userid : req.session.user?._id,isadmin : req.session.user?.isadmin});
    } catch (error) {
      console.log(error);
    }
  };

  export const projectcontrol = {
    getindex,
    getTerms,
    getAbout,
    getShop,
    getcontant,
    getBlog,
    getAddproject,
    getEdit,
    getSingleproject,
    getSingleprojectsell,
    getProject_edit,
    postaddproject,
    deleteProject,
    updateproject
  };