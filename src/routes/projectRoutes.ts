import express, { Router } from "express";
import ProjectController from "../controllers/projectController";

class ProjectRoutes {
    public router:Router;
    private projectController : ProjectController;

    constructor(){
        // this.router = express.Router();
        this.router = Router();
        this.projectController = new ProjectController();
        this.initializeRoutes();

    }

    // Initialize Routes updates the public router property with the various routes/endpoints. However this method itself is not accessible outside of this class
    private initializeRoutes(): void {

        // Routes definitions
        this.router.get('/users', this.projectController.getProjects)
    }

}

export default ProjectRoutes;