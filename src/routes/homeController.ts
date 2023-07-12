import express, { Router } from "express";
import HomeController from "../controllers/homeController";

class HomeRoutes {
    public router:Router;
    private homeController : HomeController;
    
    constructor(){
        // this.router = express.Router();
        this.router = Router();
        this.homeController = new HomeController();
        this.initializeRoutes();

    }

    // Initialize Routes updates the public router property with the various routes/endpoints. However this method itself is not accessible outside of this class
    private initializeRoutes(): void {
        // Routes definitions
        this.router.get('/graduation-years', this.homeController.graduationYears);
        this.router.get('/programs', this.homeController.programs);

    }

}

export default HomeRoutes;