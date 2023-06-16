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
exports.userInfo = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const baseFilepath_1 = __importDefault(require("../baseFilepath"));
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const path_1 = __importDefault(require("path"));
const project_1 = __importDefault(require("../models/project"));
const getlogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        res.render('login', {
            pageTitle: 'Login',
            path: '/login',
            isAuthenticate: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login,
            userid: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id,
            isadmin: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.isadmin
        });
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting login!",
        });
    }
});
const getsignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        res.render('signup', {
            pageTitle: 'Signup',
            path: '/signup',
            isAuthenticate: (_d = req.session.user) === null || _d === void 0 ? void 0 : _d.login,
            userid: (_e = req.session.user) === null || _e === void 0 ? void 0 : _e._id,
            isadmin: (_f = req.session.user) === null || _f === void 0 ? void 0 : _f.isadmin
        });
    }
    catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "An error occurred while getting signup!",
        });
    }
});
const getedituser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const U_id = req.params.userid;
        user_1.default.findById(U_id)
            .then(userInfo => {
            var _a, _b, _c;
            res.render('edituser', {
                User: userInfo,
                pageTitle: userInfo === null || userInfo === void 0 ? void 0 : userInfo.get('username'),
                path: '/edituser',
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
const postsignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, email, password } = req.body;
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
        yield user_1.default.find({ email })
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
            bcryptjs_1.default
                .hash(password, saltRounds)
                .then((hashedPassword) => {
                const newUser = new user_1.default({
                    username,
                    email,
                    password: hashedPassword,
                });
                newUser
                    .save()
                    .then((result) => {
                    var _a, _b, _c;
                    //res.status(201).json(result);
                    res.render("login", { isAuthenticate: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login, userid: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id, isadmin: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.isadmin });
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
    }
    catch (error) {
        console.log(error);
    }
});
const postlogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();
        if (email == "" || password == "") {
            return res.status(400).json({
                status: "FAILED",
                message: "Empty credentials supplied",
            });
        }
        /* Check for user email*/
        const user = yield user_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            req.session.user = {
                _id: user.id,
                username: user.username,
                email: user.email,
                login: true,
                isadmin: user.isadmin,
                token: (0, exports.generateToken)(user.id),
            };
            user_1.default.updateOne({ _id: user.id }, { login: true });
            project_1.default.find()
                .then((projects) => {
                var _a, _b, _c;
                console.log('session', req.session.user);
                // res.render('index', { user: req.session.user })
                res.render('index', {
                    projs: projects,
                    pageTitle: 'Home',
                    path: '/',
                    isAuthenticate: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login,
                    userid: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b._id,
                    isadmin: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.isadmin
                });
            })
                .catch((err) => {
                res.status(400).json({
                    status: "FAILED",
                    message: "An error occur while updating login data update",
                });
            });
        }
        else {
            res.status(400).json({
                status: "FAILED",
                message: "Email, Password is something wrong",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
/*Generate JWT */
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, `${process.env.JWT_SECRET}`, {
        expiresIn: "30d",
    });
};
exports.generateToken = generateToken;
const getLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        // Redirect the user to the desired page after logout
        res.render('login', { isAuthenticate: false, userid: null });
    });
});
const updateuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username } = req.body;
        const id = req.params.userid;
        const profilePicture = req.file;
        const UserDetail = yield user_1.default.findById(id);
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
        if (profilePicture) {
            if (profilePicture !== undefined && profilePicture !== null) {
                const file = {
                    fileName: profilePicture.filename,
                    filePath: profilePicture.path,
                    fileType: profilePicture.mimetype,
                    fileSize: fileSizeFormatter(profilePicture.size, 2),
                };
                filesArray.push(file);
                if ((UserDetail.profilePicture[0] !== undefined ||
                    UserDetail.profilePicture.length !== 0) && UserDetail.profilePicture[0] !== null) {
                    //for Image File to when when we do update picture
                    fs_1.default.unlink(path_1.default.join(baseFilepath_1.default, UserDetail.profilePicture[0].filePath), (err) => {
                        if (err) {
                            return console.log("error occur", err);
                        }
                        // console.log("file is deleted successully");
                    });
                }
            }
        }
        else {
            filesArray.push(UserDetail.profilePicture[0]);
        }
        //update project
        yield user_1.default.updateMany({ _id: id }, {
            $set: {
                username: username,
                profilePicture: filesArray,
            },
        });
        project_1.default.find()
            .then((projects) => {
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
exports.userInfo = {
    getlogin,
    postsignup,
    getsignup,
    postlogin,
    getLogout,
    updateuser,
    getedituser
};
