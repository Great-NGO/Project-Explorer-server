import express, { Router } from "express";
import UserController from "../controllers/userController";

class UserRoutes {
    public router:Router;
    private userController : UserController;

    constructor(){
        // this.router = express.Router();
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();

    }

    // Initialize Routes updates the public router property with the various routes/endpoints. However this method itself is not accessible outside of this class
    private initializeRoutes(): void {

        // Routes definitions
        this.router.get('/users', this.userController.getUsers)
    }

}

export default UserRoutes;