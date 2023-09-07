// const Project = require("../models/projectModel");
import { Model, Types } from "mongoose";

import { translateError } from "../utils/translateError";
import { BaseService, TServiceResponse } from "./baseService";
import { IProject, TProject, Project } from "../models/projectModel";

const { ObjectId } = Types;

/** Project Service Class - Manage every Project related operation */
class ProjectService extends BaseService<IProject> {

    constructor() {
        super(Project)
    }

    static async getProjectById(id: Types.ObjectId, user: any): Promise<TServiceResponse<TProject>> {
        try {

            // Pipeline check to ensure that the project actually exists and returns related comments, replies and likes
            const pipeline = [
                {
                    '$match': {
                        '_id': new ObjectId(id)
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'createdBy',
                        'foreignField': '_id',
                        'as': 'projectOwner'
                    }
                }, {
                    '$unwind': {
                        'path': '$projectOwner'
                    }
                }, {
                    '$match': {
                        'projectOwner': {
                            '$exists': true
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'comments',
                        'localField': 'comments',
                        'foreignField': '_id',
                        'as': 'comments'
                    }
                }, {
                    '$unwind': {
                        'path': '$comments'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'comments.commentAuthor',
                        'foreignField': '_id',
                        'as': 'comments.commentAuthor'
                    }
                }, {
                    '$unwind': {
                        'path': '$comments.commentAuthor',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$lookup': {
                        'from': 'commentlikes',
                        'localField': 'comments._id',
                        'foreignField': 'commentId',
                        'as': 'comments.likes'
                    }
                }, {
                    '$lookup': {
                        'from': 'comments',
                        'let': {
                            'parentCommentId': '$comments._id'
                        },
                        'pipeline': [
                            {
                                '$match': {
                                    '$expr': {
                                        '$eq': [
                                            '$parentCommentId', '$$parentCommentId'
                                        ]
                                    }
                                }
                            }, {
                                '$lookup': {
                                    'from': 'users',
                                    'localField': 'comments.commentAuthor',
                                    'foreignField': '_id',
                                    'as': 'comments.commentAuthor'
                                }
                            }, {
                                '$unwind': {
                                    'path': '$comments.commentAuthor',
                                    'preserveNullAndEmptyArrays': true
                                }
                            }, {
                                '$lookup': {
                                    'from': 'commentlikes',
                                    'localField': 'comments._id',
                                    'foreignField': 'commentId',
                                    'as': 'likes'
                                }
                            }
                        ],
                        'as': 'comments.replies'
                    }
                }, {
                    '$group': {
                        '_id': '$_id',
                        'name': {
                            '$first': '$name'
                        },
                        'abstract': {
                            '$first': '$abstract'
                        },
                        'authors': {
                            '$first': '$authors'
                        },
                        'tags': {
                            '$first': '$tags'
                        },
                        'createdBy': {
                            '$first': '$createdBy'
                        },
                        'projectOwner': {
                            '$first': '$projectOwner'
                        },
                        'comments': {
                            '$push': '$comments'
                        }
                    }
                }, {
                    '$project': {
                        '_id': 1,
                        'name': 1,
                        'abstract': 1,
                        'authors': 1,
                        'tags': 1,
                        'projectOwner._id': 1,
                        'projectOwner.firstname': 1,
                        'projectOwner.lastname': 1,
                        'projectOwner.email': 1,
                        'projectOwner.profilePicture': 1,
                        'comments': {
                            '$map': {
                                'input': '$comments',
                                'as': 'comment',
                                'in': {
                                    '_id': '$$comment._id',
                                    'text': '$$comment.text',
                                    'date': '$$comment.date',
                                    'updatedAt': '$$comment.updatedAt',
                                    'commentAuthor': {
                                        '_id': {
                                            '$ifNull': [
                                                '$$comment.commentAuthor._id', null
                                            ]
                                        },
                                        'firstname': {
                                            '$ifNull': [
                                                '$$comment.commentAuthor.firstname', 'guest'
                                            ]
                                        },
                                        'lastname': {
                                            '$ifNull': [
                                                '$$comment.commentAuthor.lastname', 'guest'
                                            ]
                                        },
                                        'email': {
                                            '$ifNull': [
                                                '$$comment.commentAuthor.email', 'guest'
                                            ]
                                        },
                                        'profilePicture': {
                                            '$ifNull': [
                                                '$$comment.commentAuthor.profilePicture', 'guest profile pic'
                                            ]
                                        }
                                    },
                                    'likes': '$$comment.likes',
                                    'replies': {
                                        '$map': {
                                            'input': '$$comment.replies',
                                            'as': 'reply',
                                            'in': {
                                                '_id': '$$reply._id',
                                                'text': '$$reply.text',
                                                'date': '$$reply.date',
                                                'updatedAt': '$$reply.updatedAt',
                                                'commentAuthor': {
                                                    '_id': {
                                                        '$ifNull': [
                                                            '$$reply.commentAuthor._id', null
                                                        ]
                                                    },
                                                    'firstname': {
                                                        '$ifNull': [
                                                            '$$reply.commentAuthor.firstname', 'guest'
                                                        ]
                                                    },
                                                    'lastname': {
                                                        '$ifNull': [
                                                            '$$reply.commentAuthor.lastname', 'guest'
                                                        ]
                                                    },
                                                    'email': {
                                                        '$ifNull': [
                                                            '$$reply.commentAuthor.email', 'guest'
                                                        ]
                                                    },
                                                    'profilePicture': {
                                                        '$ifNull': [
                                                            '$$reply.commentAuthor.profilePicture', 'guest profile pic'
                                                        ]
                                                    }
                                                },
                                                'likes': '$$reply.likes'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ];

            // Aggregation pipeline always returns
            const [ project ] = await Project.aggregate(pipeline);
            // const project = await Project.findById(id);
            // If project not found
            if (!project) {
                return [false, null, "Project not found or something went wrong in retrieving project details.", { status: 400 }];
            }

            return [true, null, "User not found.", { status: 404 }];
        } catch (error) {
            return translateError(error, "retrieving Project details.")
        }
    }

    static async update(id: Types.ObjectId | string, userId: Types.ObjectId | string, fields: { name: string, abstract: string, authors?: Types.Array<string>, tags?: Types.Array<string> }): Promise<TServiceResponse<TProject>> {
        try {

            // Get the project, check that the project owner is the authorized owner - same user id
            //Proceed to update, if update successful, return success

            const project = await Project.findById(id);
            if (!project) {
                return [false, null, "Project not found.", { status: 404 }];
            }

            // check if the user is authorized to update the project
            if (project.createdBy.toString() !== userId.toString()) {
                return [false, null, "User Unauthorized to update this project.", { status: 401 }];
            }


            // Update details
            // project.name = fields.name;
            // project.abstract = fields.abstract;
            // project.authors = fields.authors ? fields.authors : project.authors;
            // project.tags = fields.tags ? fields.tags : project.tags;
            // const updatedProject = await project.save();

            const updatedProject = await Project.findByIdAndUpdate(id, { $set: fields }, { new: true });
            if (!updatedProject) {
                return [false, null, "Failed to update project", { status: 400 }]
            }
            return [true, updatedProject, "Project updated successfully.", { status: 200 }];

        } catch (error) {
            return translateError(error, "updating Project details.")

        }
    }

    static async delete(id: Types.ObjectId | string, userId: Types.ObjectId): Promise<TServiceResponse<TProject>> {
        try {

            const project = await Project.findById(id);
            if (!project) {
                return [false, null, "Project not found.", { status: 404 }];
            }

            // check if the user is authorized to update the project
            if (project.createdBy.toString() !== userId.toString()) {
                return [false, null, "User Unauthorized to delete this project.", { status: 401 }];
            }

            const deletedProject = await project.deleteOne();

            if (!deletedProject) {
                return [false, null, "Failed to update project", { status: 400 }]
            }

            return [true, null, "Project deleted successfully.", { status: 200 }];


        } catch (error) {
            return translateError(error, "deleting project");
        }
    }
}

export default ProjectService;