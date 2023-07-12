
// Import interface/types for request and response from express
import { Request, Response } from "express";

class UserController {

    public async signup(req: Request, res: Response): Promise<void> {

    }

    public async login(req: Request, res: Response): Promise<void> {

    }
 
    public async logout(req: Request, res: Response): Promise<void> {

    }

    public async forgotPassword(req: Request, res: Response): Promise<void> {

    }

    public async resetPassword(req: Request, res: Response): Promise<void> {

    }

    public async editDetails(req: Request, res: Response): Promise<void> {

    }

    public async deleteAccount(req: Request, res: Response): Promise<void> {

    }

    public async editPassword(req: Request, res: Response): Promise<void> {

    }

    public async removeProfilePicture(req: Request, res: Response): Promise<void> {

    }

    public async getUsers(req: Request, res: Response): Promise<void> {
        // Would use async handler
        res.json("YY")
    }

    public async getUserDetails(req: Request, res: Response): Promise<void> {

    }

    public async getNotification(req: Request, res: Response): Promise<void> {

    }

    public async getNotifications(req: Request, res: Response): Promise<void> {

    }

    public async deleteNotification(req: Request, res: Response): Promise<void> {

    }

    public async deleteNotifications(req: Request, res: Response): Promise<void> {

    }

}

export default UserController;