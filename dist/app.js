"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const user_1 = __importDefault(require("./routes/user"));
const project_1 = __importDefault(require("./routes/project"));
const express_session_1 = __importDefault(require("express-session"));
const ServerData = () => {
    const app = (0, express_1.default)();
    (0, dotenv_1.config)();
    app.use((0, cors_1.default)({
        credentials: true,
    }));
    app.use((0, compression_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use(body_parser_1.default.json());
    app.use(express_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
    //session
    app.use((0, express_session_1.default)({
        secret: 'process.env.SESSION_SECRET',
        resave: false,
        saveUninitialized: false,
    }));
    app.set("view engine", "ejs");
    app.set("views", "views");
    // api path
    app.use(user_1.default);
    app.use(project_1.default);
    return app;
};
exports.default = ServerData;
