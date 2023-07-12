import express, { Router } from "express";
import UserController from "../controllers/userController";
import asyncHandler from "../middleware/asyncHandler";
import { requireSignin } from "../middleware/authMiddleware";
import { userForgotPasswordValidator, userLoginValidator, userResetPasswordValidator, userSignupValidator, userUpdatePasswordValidator, userUpdateProfileValidator } from "../validators/userValidations";
import validate from "../middleware/validationMiddleware";

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
        this.router.get('/users', asyncHandler(this.userController.getUsers) );
        this.router.get('/user/:id', asyncHandler(this.userController.getUserDetails) );
        this.router.get('/user-profile', requireSignin, asyncHandler(this.userController.getUserDetails) );
        this.router.put('/edit-profile', requireSignin, userUpdateProfileValidator, validate, asyncHandler(this.userController.editDetails) );
        this.router.put('/edit-password', requireSignin, userUpdatePasswordValidator, validate, asyncHandler(this.userController.editPassword) );
        this.router.put('/remove-profile-picture', requireSignin, asyncHandler(this.userController.removeProfilePicture) );

        this.router.post('/delete-account', requireSignin, asyncHandler(this.userController.deleteAccount) );
        
        this.router.post('/signup', userSignupValidator, validate, asyncHandler(this.userController.signup));
        this.router.post('/login', userLoginValidator, validate, asyncHandler(this.userController.login));
        this.router.get('/logout', asyncHandler(this.userController.logout));
        this.router.post('/logout', asyncHandler(this.userController.logout));
        this.router.post('/forgot-password', userForgotPasswordValidator, validate, asyncHandler(this.userController.forgotPassword));
        this.router.post('/reset-password', userResetPasswordValidator, validate, asyncHandler(this.userController.resetPassword));
        this.router.put('/reset-password', userResetPasswordValidator, validate, asyncHandler(this.userController.resetPassword));

        this.router.get('/notifications', requireSignin, this.userController.getNotifications);
        this.router.get('/notification/:id', requireSignin, this.userController.getNotification);
        this.router.post('/notification/delete', requireSignin, this.userController.deleteNotification);
        // this.router.post('/notification/delete', requireSignin, deleteNotificationValidator, validate, this.userController.deleteNotification);
        this.router.post('/notifications/delete', requireSignin, this.userController.deleteNotifications);

        
    }

}

export default UserRoutes;