const Project = require("../models/project");
const { translateError } = require("../models/mongo_helper");

/* Create new Project */
const createProject = async ({ name, abstract, authors, tags, createdBy}) => {
    try {
        const project = new Project({
            name,
            abstract,
            authors,
            tags,
            createdBy
        })

        if(await project.save()) {
            return [true, project]
        }

    } catch (error) {
        console.log(translateError(error));

    }
}

const getLast4Projects = async() => {
    try {
        const projectShowcase = await Project.find({}).sort({ _id: -1}).limit(4);    //Return last 4 projects in descending order (Most recent)
        return projectShowcase;
    } catch (error) {
        console.log(error)
        return translateError(error)
    }
}

const getAllProjects = async() => {
    try {
        const projects = await Project.find({}).sort({ _id: -1});    //Return all projects in descending order (Most recent)
        return projects;
    } catch (error) {
        console.log(error)
        return translateError(error)
    }
}

/* Return a Project with Specified id */
const getProjectById = async(id) => {
    try {
        const project = await Project.findById(id).populate(`createdBy`);
        return project
    } catch (error) {
        console.log(error);
        return translateError(error)
    }
}

/* Update Project */
const updateProject = async (id, fields) => {
    const project = await Project.findByIdAndUpdate(id, fields, {new: true});
    return project
}

/* Delete Project */
const deleteProject = async (id) => await Project.findByIdAndDelete(id)
// const deleteProject = async (id) => {
//     await Project.findByIdAndDelete(id)
//     // Would also have to delete comments id and replies and notifications under a particular project
// }

module.exports = {
    createProject,
    getLast4Projects,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
}