"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ProjectSchema = new Schema({
    project_name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    projectImg: {
        type: [],
        require: true,
        default: null
    },
    projectFile: {
        type: [],
        require: true,
        default: null
    },
    description: {
        type: String,
        required: true
    },
    tech_description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const ProjectModel = mongoose_1.default.model("project", ProjectSchema);
exports.default = ProjectModel;
