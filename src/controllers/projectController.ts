
// Import interface/types for request and response from express
import { Request, Response } from "express";

class ProjectController {

    public async getProjectById( req: Request, res: Response) : Promise<void> {
        // Would use async handler
        res.json("YY")
    }

    public async getProjects( req: Request, res: Response) : Promise<void> {
        // Would use async handler
        res.json("YY")
    }

    public async getProjectsPaginated( req: Request, res: Response) : Promise<void> {
        
    }

    public async projectsShowcase( req: Request, res: Response) : Promise<void> {
        
    }

    public async searchProject( req: Request, res: Response) : Promise<void> {
        
    }

    public async createNewProject( req: Request, res: Response) : Promise<void> {
        
    }

    public async editProject( req: Request, res: Response) : Promise<void> {
        
    }

    public async deleteProject( req: Request, res: Response) : Promise<void> {
        
    }

    public async uploadProjectFile ( req: Request, res: Response ) : Promise<void> {
        
    }
  
    public async viewProjectFile ( req: Request, res: Response ) : Promise<void> {

    }
  
    public async downloadProjectFile ( req: Request, res: Response ) : Promise<void> {

    }
}

export default ProjectController;