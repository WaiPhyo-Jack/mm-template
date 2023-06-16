"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    login: {
        type: Boolean,
        require: true,
        default: false
    },
    profilePicture: {
        type: [],
        require: true,
        default: null
    },
    isadmin: {
        type: Boolean,
        require: true,
        default: false
    }
}, {
    timestamps: true
});
const UserModel = mongoose_1.default.model("user", UserSchema);
exports.default = UserModel;
