// const Project = require("../models/projectModel");
import { Model, Types } from "mongoose";

import { translateError } from "../utils/translateError";
import { BaseService, TServiceResponse } from "./baseService";
import { IProject, TProject, Project } from "../models/projectModel";



/** Project Service Class - Manage every Project related operation */
class ProjectService extends BaseService<IProject> {

    constructor(){
        super(Project)
    }

}

export default ProjectService;