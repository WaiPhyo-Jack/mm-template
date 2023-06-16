import mongoose from "mongoose";
const { Schema } = mongoose;

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
    },
    {
        timestamps: true
    });

const ProjectModel = mongoose.model("project", ProjectSchema);
export default ProjectModel;