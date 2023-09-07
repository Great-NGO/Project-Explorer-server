
// Import interface/types for request and response from express
import { Request, Response } from "express";
import responseHandler, { TControllerResponse } from "../utils/responseHandler";
import { AuthRequest } from "../middleware/authMiddleware";
import ProjectService from "../services/projectService";
import { Types } from "mongoose";

class ProjectController {

    public async getProjectById(req: AuthRequest, res: Response): Promise<TControllerResponse | any> {
        // Would use async handler

        const id: Types.ObjectId = new Types.ObjectId(req.params!.id);   //Convert the users id to type of Object Id

        let user = req.user;
        let [success, data, message, metadata] = await ProjectService.getProjectById(id, user);
        if (success) {
            return responseHandler(res, "Project details returned successfully", metadata?.status || 200, true, { project: data });
        }
        return responseHandler(res, message, metadata?.status || 400)

    }

    public async getProjects(req: Request, res: Response): Promise<TControllerResponse | any> {
        // Would use async handler
        res.json("YY")
    }

    public async getProjectsPaginated(req: Request, res: Response): Promise<TControllerResponse | any> {

        const page = Number(req.query?.page) || 1;  //Default page is 1
        const limit = Number(req.query?.size) || 10;     //Default page size is 10
        const searchTerm = req.query?.searchTerm || '';

        let [ success, data, message, metadata ] = await new ProjectService().findAllPaginated({ page, limit })
        
        if(success){
            return responseHandler(res, message, metadata?.status || 200, true, { info: data, projects: data?.data })
        }
        return responseHandler(res, message, metadata?.status || 400);
        
    }

    public async projectsShowcase(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async searchProject(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async createNewProject(req: AuthRequest, res: Response): Promise<TControllerResponse | any> {
        let { name, abstract, authors, tags } = req.body;
        const createdBy: Types.ObjectId = new Types.ObjectId(req.user!.id);   //Convert the users id to type of Object Id

        // Convert authors and tags properties from the request body to an array and filter any whitespace
        authors = authors.split(",").filter((author: string) => author !== "");
        tags = tags.split('#').filter((tag: string) => tag !== "");
        // Trim off any whitespace for authors and tags before saving them to the database
        authors = authors.map((element: string) => element.trim());
        tags = tags.map((element: string) => element.trim());

        let newProject = { name, abstract, authors, tags, createdBy };

        let [success, data, message, metadata] = await new ProjectService().create(newProject);

        if (success) {
            return responseHandler(res, "Project created successfully.", metadata?.status || 201, true, { project: data });
        }
        return responseHandler(res, "Failed to create new project.", metadata?.status || 400);
    }

    public async editProject(req: AuthRequest, res: Response): Promise<TControllerResponse | any> {

        const userId = req.user!.id;

        let { name, abstract, authors, tags, projectId } = req.body;
        // Convert authors and tags properties from the request body to an array and filter any whitespace
        authors = authors.split(",").filter((author: string) => author !== "");
        tags = tags.split('#').filter((tag: string) => tag !== "");
        // Trim off any whitespace for authors and tags before updating them in the database
        authors = authors.map((element: string) => element.trim());
        tags = tags.map((element: string) => element.trim());

        const fields = { name, abstract, authors, tags };

        let [success, data, message, metadata] = await ProjectService.update(projectId, userId, fields);

        if (success) {
            return responseHandler(res, message, metadata?.status || 200, true, { project: data });
        }
        return responseHandler(res, message, metadata?.status || 400);

    }

    public async deleteProject(req: AuthRequest, res: Response): Promise<TControllerResponse | any> {
        
        const { projectId } = req.body;

        const userId: Types.ObjectId = new Types.ObjectId(req.user!.id);   //Convert the users id to type of Object Id
        
        let [success, data, message, metadata] = await ProjectService.delete(projectId, userId);

        if (success) {
            return responseHandler(res, message, metadata?.status || 200, true);
        }
        return responseHandler(res, message, metadata?.status || 400);
    }

    public async uploadProjectFile(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async viewProjectFile(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async downloadProjectFile(req: Request, res: Response): Promise<TControllerResponse | any> {

    }
}

export default ProjectController;