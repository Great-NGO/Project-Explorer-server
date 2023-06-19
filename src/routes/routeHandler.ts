import { Application } from "express";
import { readdirSync } from "fs";
import { join } from "path";

class RouteHandler {
    private app: Application;
    
    // Takes the app object from the app.ts (entry file) and passes it to the constructor
    constructor(app: Application) {
        this.app = app;
    }

    public loadRoutes(): void {
        // The routes are located in the same directory
        const routesPath = join(__dirname, './');

        readdirSync(routesPath).map((routeFile) => {


            const routeFilePath = join(routesPath, routeFile);
            const RouteClass = require(routeFilePath).default;

            // If the loaded route class is the RouteHandler itself, do nothing
            if(RouteClass === RouteHandler) {
                return;
            }

            const routeInstance = new RouteClass();
            this.app.use('/api/v1', routeInstance.router);
        });
    }
}

export default RouteHandler;