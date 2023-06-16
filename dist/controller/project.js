"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectcontrol = void 0;
const baseFilepath_1 = __importDefault(require("../baseFilepath"));
const project_1 = __importDefault(require("../models/project"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getindex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        project_1.default.find()
            .then(projects => {
            var _a, _b, _c;
            res.render('index', {
                projs: projects,
                pageTitle: 'Home',
                path: '/',
                isAuthenticate: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login,
                userid: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id,
                isadmin: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.isadmin
            });
        });
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting index!",
        });
    }
});
const getAbout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        res.render('about', {
            pageTitle: 'About',
            path: '/about',
            isAuthenticate: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login,
            userid: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id,
            isadmin: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.isadmin
        });
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting about!",
        });
    }
});
const getShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        project_1.default.find()
            .then(projects => {
            var _a, _b, _c;
            res.render('shop', {
                projs: projects,
                pageTitle: 'shop',
                path: '/shop',
                isAuthenticate: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login,
                userid: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id,
                isadmin: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.isadmin
            });
        });
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting shop!",
        });
    }
});
const getcontant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        res.render('contact', {
            pageTitle: 'Contact',
            path: '/contact',
            isAuthenticate: (_d = req.session.user) === null || _d === void 0 ? void 0 : _d.login,
            userid: (_e = req.session.user) === null || _e === void 0 ? void 0 : _e._id,
            isadmin: (_f = req.session.user) === null || _f === void 0 ? void 0 : _f.isadmin
        });
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting content!",
        });
    }
});
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        res.render('blog', {
            pageTitle: 'Blog',
            path: '/blog',
            isAuthenticate: (_g = req.session.user) === null || _g === void 0 ? void 0 : _g.login,
            userid: (_h = req.session.user) === null || _h === void 0 ? void 0 : _h._id,
            isadmin: (_j = req.session.user) === null || _j === void 0 ? void 0 : _j.isadmin
        });
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting content!",
        });
    }
});
const getAddproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        res.render('project_add', {
            pageTitle: 'Add Project',
            path: '/project_add',
            isAuthenticate: (_k = req.session.user) === null || _k === void 0 ? void 0 : _k.login,
            userid: (_l = req.session.user) === null || _l === void 0 ? void 0 : _l._id,
            isadmin: (_m = req.session.user) === null || _m === void 0 ? void 0 : _m.isadmin
        });
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting content!",
        });
    }
});
const getEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        project_1.default.find()
            .then(projects => {
            var _a, _b, _c;
            res.render('edit', {
                projs: projects,
                pageTitle: 'Edit',
                path: '/edit',
                isAuthenticate: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login,
                userid: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id,
                isadmin: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.isadmin
            });
        });
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting content!",
        });
    }
});
const getSingleproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projId = req.params.projectId;
        project_1.default.findById(projId)
            .then((project) => {
            var _a, _b, _c;
            res.render('shopsingle', {
                project: project,
                pageTitle: project === null || project === void 0 ? void 0 : project.get('project_name'),
                path: '/shopsingle',
                isAuthenticate: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login,
                userid: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id,
                isadmin: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.isadmin
            });
        });
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting content!",
        });
    }
});
const getSingleprojectsell = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p;
    try {
        if (((_o = req.session.user) === null || _o === void 0 ? void 0 : _o.login) == true) {
            console.log("sell", (_p = req.session.user) === null || _p === void 0 ? void 0 : _p.login);
            const projId = req.params.projectId;
            project_1.default.findById(projId)
                .then(project => {
                var _a, _b, _c;
                res.render('shopsinglesell', {
                    project: project,
                    pageTitle: project === null || project === void 0 ? void 0 : project.get('project_name'),
                    path: '/shopsinglesell',
                    isAuthenticate: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login,
                    userid: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id,
                    isadmin: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.isadmin
                });
            });
        }
        else {
            res.redirect('/login');
        }
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting content!",
        });
    }
});
const getProject_edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projId = req.params.projectId;
        project_1.default.findById(projId)
            .then(project => {
            var _a, _b, _c;
            res.render('project_edit', {
                project: project,
                pageTitle: project === null || project === void 0 ? void 0 : project.get('project_name'),
                path: '/project_edit',
                isAuthenticate: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login,
                userid: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id,
                isadmin: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.isadmin
            });
        });
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting content!",
        });
    }
});
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _q, _r, _s;
    try {
        const projId = req.params.projectId;
        const ProjectDetail = yield project_1.default.findById(projId);
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
            : fs_1.default.unlink(path_1.default.join(baseFilepath_1.default, ProjectDetail.projectImg[0].filePath), (err) => {
                // return fs.unlink(path.join(data.filePath), (err) => {
                if (err) {
                    return console.log("error occur", err);
                }
                // console.log("file is deleted successully");
            });
        ProjectDetail.projectFile[0] === null ||
            ProjectDetail.projectFile.length <= 0
            ? console.log("file is empty file")
            : fs_1.default.unlink(path_1.default.join(baseFilepath_1.default, ProjectDetail.projectFile[0].filePath), (err) => {
                // return fs.unlink(path.join(data.filePath), (err) => {
                if (err) {
                    return console.log("error occur", err);
                }
                // console.log("file is deleted successully");
            });
        yield project_1.default.findByIdAndRemove(projId).exec();
        res.status(200).render('/edit', { isAuthenticate: (_q = req.session.user) === null || _q === void 0 ? void 0 : _q.login, userid: (_r = req.session.user) === null || _r === void 0 ? void 0 : _r._id, isadmin: (_s = req.session.user) === null || _s === void 0 ? void 0 : _s.isadmin });
        // res.send();
    }
    catch (error) {
        console.log(error);
    }
});
const postaddproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { project_name, category, price, description, tech_description } = req.body;
        const uploadfile = req.files;
        const { projectImg, projectFile } = uploadfile;
        if (!project_name || !category || !description || !tech_description || !projectImg || !projectFile) {
            return res.status(404).json({
                status: "FAILED",
                message: "Empty input Fields!",
            });
        }
        //find user email from database
        yield project_1.default.find({ project_name })
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
            const project = new project_1.default({
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
                var _a, _b, _c;
                // console.log(result);
                //console.log('Created Project');
                res.render('/project_add', { isAuthenticate: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login, userid: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id, isadmin: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.isadmin });
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
    }
    catch (error) {
        console.log(error);
    }
});
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return "0 byte";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]);
};
const updateproject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _t, _u, _v;
    try {
        let { project_name, category, price, description, tech_description } = req.body;
        const id = req.params.projectId;
        const uploadfile = req.files;
        const ProjectDetail = yield project_1.default.findById(id);
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
        if (uploadfile) {
            const { projectImg, projectFile } = uploadfile;
            if (projectImg) {
                if (projectImg !== undefined && projectImg !== null) {
                    const imgfile = {
                        fileName: projectImg[0].filename,
                        filePath: projectImg[0].path,
                        fileType: projectImg[0].mimetype,
                        fileSize: fileSizeFormatter(projectImg[0].size, 2),
                    };
                    imgfilesArray.push(imgfile);
                    if (ProjectDetail.projectImg[0] !== undefined ||
                        ProjectDetail.projectImg.length !== 0) {
                        //for Image File to when when we do update picture
                        fs_1.default.unlink(path_1.default.join(baseFilepath_1.default, ProjectDetail.projectImg[0].filePath), (err) => {
                            if (err) {
                                return console.log("error occur", err);
                            }
                            // console.log("file is deleted successully");
                        });
                    }
                }
            }
            else {
                imgfilesArray.push(ProjectDetail.projectImg[0]);
            }
            if (projectFile) {
                if (projectFile !== undefined && projectFile !== null) {
                    const projfile = {
                        fileName: projectFile[0].filename,
                        filePath: projectFile[0].path,
                        fileType: projectFile[0].mimetype,
                        fileSize: fileSizeFormatter(projectFile[0].size, 2),
                    };
                    projectfilesArray.push(projfile);
                    if (ProjectDetail.projectFile[0] !== undefined ||
                        ProjectDetail.projectFile.length !== 0) {
                        //for Image File to when when we do update picture
                        fs_1.default.unlink(path_1.default.join(baseFilepath_1.default, ProjectDetail.projectFile[0].filePath), (err) => {
                            if (err) {
                                return console.log("error occur", err);
                            }
                            // console.log("file is deleted successully");
                        });
                    }
                }
            }
            else {
                projectfilesArray.push(ProjectDetail.projectFile[0]);
            }
        }
        else {
            projectfilesArray.push(ProjectDetail.projectFile[0]);
            imgfilesArray.push(ProjectDetail.projectImg[0]);
        }
        //update project
        yield project_1.default.updateMany({ _id: id }, {
            $set: {
                project_name: project_name,
                category: category,
                price: price,
                description: description,
                tech_description: tech_description,
                projectImg: imgfilesArray,
                projectFile: projectfilesArray
            },
        });
        res.render('/edit', { isAuthenticate: (_t = req.session.user) === null || _t === void 0 ? void 0 : _t.login, userid: (_u = req.session.user) === null || _u === void 0 ? void 0 : _u._id, isadmin: (_v = req.session.user) === null || _v === void 0 ? void 0 : _v.isadmin });
    }
    catch (error) {
        console.log(error);
    }
});
exports.projectcontrol = {
    getindex,
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
