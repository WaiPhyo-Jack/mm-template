"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectimgmiddleware_1 = require("../middleware/projectimgmiddleware");
const project_1 = require("../controller/project");
const iflogin_1 = __importDefault(require("../middleware/iflogin"));
const router = express_1.default.Router();
router.get("/", project_1.projectcontrol.getindex);
router.get("/about", project_1.projectcontrol.getAbout);
router.get("/shop", project_1.projectcontrol.getShop);
router.get("/contact", iflogin_1.default, project_1.projectcontrol.getcontant);
router.get("/blog", project_1.projectcontrol.getBlog);
router.get("/project_add", project_1.projectcontrol.getAddproject);
router.get("/edit", project_1.projectcontrol.getEdit);
router.get("/shopsingle/:projectId", project_1.projectcontrol.getSingleproject);
router.get("/shopsinglesell/:projectId", project_1.projectcontrol.getSingleprojectsell);
router.get('/edit/:projectId', project_1.projectcontrol.getProject_edit);
router.get('/delete/:projectId', project_1.projectcontrol.deleteProject);
router.get('/edit/:projectId', project_1.projectcontrol.getProject_edit);
router.post('/project_add', projectimgmiddleware_1.ProjectimgData.Projectupload, project_1.projectcontrol.postaddproject);
router.post('/edit/:projectId', projectimgmiddleware_1.ProjectimgData.Projectupload, project_1.projectcontrol.updateproject);
exports.default = router;
