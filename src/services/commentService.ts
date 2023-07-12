// const Comment = require("../models/commentModel");
import { Model, Types } from "mongoose";

import { translateError } from "../utils/translateError";
import { BaseService, ServiceResponse } from "./baseService";

import { Comment, IComment } from "../models/commentModel";



/** Comment Service Class - Manage every Comment related operation */
class CommentService extends BaseService<IComment> {

    constructor(){
        super(Comment)
    }

}

export default CommentService;