import express from "express";
import { ProjectimgData } from "../middleware/projectimgmiddleware";
import { projectcontrol } from "../controller/project";
import protect from "../middleware/authmiddleware";
import isLoggedIn from "../middleware/iflogin";
const router = express.Router();

router.get("/", projectcontrol.getindex);

router.get("/TermsandConditions", projectcontrol.getTerms);

router.get("/about", projectcontrol.getAbout);

router.get("/shop", projectcontrol.getShop);

router.get("/contact", projectcontrol.getcontant);

router.get("/blog", projectcontrol.getBlog);

router.get("/project_add", projectcontrol.getAddproject);

router.get("/edit", projectcontrol.getEdit);

router.get("/shopsingle/:projectId", projectcontrol.getSingleproject);

router.get("/shopsinglesell/:projectId", projectcontrol.getSingleprojectsell);

router.get('/edit/:projectId', projectcontrol.getProject_edit);

router.get('/delete/:projectId', projectcontrol.deleteProject);

router.get('/edit/:projectId', projectcontrol.getProject_edit);

router.post('/project_add', ProjectimgData.Projectupload, projectcontrol.postaddproject);

router.post('/edit/:projectId', ProjectimgData.Projectupload, projectcontrol.updateproject);


export default router;