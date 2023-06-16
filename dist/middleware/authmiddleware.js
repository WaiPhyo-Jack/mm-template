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
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../models/user"));
const verifyJWT = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
        return { payload: decoded };
    }
    catch (error) {
        console.log(error);
        return { payload: null };
    }
};
exports.verifyJWT = verifyJWT;
const protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            /* Get token from header */
            token = req.headers.authorization.split(" ")[1];
            /* Verify token */
            const decoded = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
            // const decoded: TokenPayload | JwtPayload = verifyJWT(token)
            console.log("decoded data", decoded);
            console.log("decoded data", decoded.id);
            /* Get user from the token */
            const reqUser = yield user_1.default.findById(decoded.id).select("-password");
            if (reqUser) {
                next();
            }
            else {
                res.status(403).json("You are not allow to do that!");
            }
        }
        catch (error) {
            console.log(error);
            res.status(401); //not autorized code
            throw new Error("Not authorized");
        }
    }
    if (!token) {
        res.status(404);
        throw new Error("Not authorized, no token");
    }
}));
// const verifyTokenAndAuthorization = (req, res, next) => {
//   protect(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not allow to do that!");
//     }
//   });
// };
exports.default = protect;
// module.exports = { protect };
