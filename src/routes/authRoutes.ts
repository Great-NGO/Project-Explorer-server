import express, { Router } from "express";
import { checkUser, requireSignin } from "../middleware/authMiddleware";
import validate from "../middleware/validationMiddleware";
import AuthController from "../controllers/authController";
import { continueSignupValidator } from "../validators/userValidations";

class AuthRoutes {
    public router:Router;
    private authController : AuthController;

    constructor(){
        // this.router = express.Router();
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();

    }

    // Initialize Routes updates the public router property with the various routes/endpoints. However this method itself is not accessible outside of this class
    private initializeRoutes(): void {

        // Routes definitions
        this.router.post('/google-login', this.authController.googleLogin);
        this.router.put('/continue-signup', checkUser, continueSignupValidator, validate, this.authController.continueSignup);

    }

}

export default AuthRoutes;