// const CommentLikes = require("../models/commentLikesModel");
import { Model, Types } from "mongoose";

import { translateError } from "../utils/translateError";
import { BaseService, ServiceResponse } from "./baseService";

import { CommentLikes, ICommentLikes } from "../models/commentLikesModel";



/** Comment Likes Service Class - Manage every Comment Likes related operation */
class CommentLikesService extends BaseService<ICommentLikes> {

    constructor(){
        super(CommentLikes)
    }

}

export default CommentLikesService;