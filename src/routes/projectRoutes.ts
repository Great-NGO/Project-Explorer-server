import express, { Router } from "express";
import ProjectController from "../controllers/projectController";
import { checkUser, requireSignin } from "../middleware/authMiddleware";
import { createProjectValidator, deleteProjectValidator, updateProjectValidator } from "../validators/projectValidation";
import validate from "../middleware/validationMiddleware";

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
        this.router.get('/projectsShowcase', this.projectController.projectsShowcase);
        this.router.get('/projects', this.projectController.getProjects);
        this.router.get('/view-projects', this.projectController.getProjectsPaginated);

        // Endpoint for searching projects which returns results in paginated response
        this.router.get('/search-projects', this.projectController.searchProject);

        this.router.get('/project/:id', checkUser, this.projectController.getProjectById);
        this.router.get('/project', checkUser, this.projectController.getProjectById);
        this.router.post('/project/submit', requireSignin, createProjectValidator, validate, this.projectController.createNewProject);
        this.router.put('/edit-project', requireSignin, updateProjectValidator, validate, this.projectController.editProject);
        this.router.post('/delete-project', requireSignin, deleteProjectValidator, validate, this.projectController.deleteProject);

        this.router.put('/upload-project-file', requireSignin, this.projectController.uploadProjectFile);
        this.router.get('/project-file', this.projectController.viewProjectFile);
        this.router.get('/download-project-file', this.projectController.downloadProjectFile);
    }

}

export default ProjectRoutes;