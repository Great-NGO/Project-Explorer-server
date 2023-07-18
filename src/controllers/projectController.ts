
// Import interface/types for request and response from express
import { Request, Response } from "express";
import { TControllerResponse } from "../utils/responseHandler";

class ProjectController {

    public async getProjectById( req: Request, res: Response) : Promise<TControllerResponse | any> {
        // Would use async handler
        res.json("YY")
    }

    public async getProjects( req: Request, res: Response) : Promise<TControllerResponse | any> {
        // Would use async handler
        res.json("YY")
    }

    public async getProjectsPaginated( req: Request, res: Response) : Promise<TControllerResponse | any> {
        
    }

    public async projectsShowcase( req: Request, res: Response) : Promise<TControllerResponse | any> {
        
    }

    public async searchProject( req: Request, res: Response) : Promise<TControllerResponse | any> {
        
    }

    public async createNewProject( req: Request, res: Response) : Promise<TControllerResponse | any> {
        
    }

    public async editProject( req: Request, res: Response) : Promise<TControllerResponse | any> {
        
    }

    public async deleteProject( req: Request, res: Response) : Promise<TControllerResponse | any> {
        
    }

    public async uploadProjectFile ( req: Request, res: Response ) : Promise<TControllerResponse | any> {
        
    }
  
    public async viewProjectFile ( req: Request, res: Response ) : Promise<TControllerResponse | any> {

    }
  
    public async downloadProjectFile ( req: Request, res: Response ) : Promise<TControllerResponse | any> {

    }
}

export default ProjectController;