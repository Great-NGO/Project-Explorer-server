require("dotenv").config();
import express, { Express, Request, Response, NextFunction } from "express";
import { NODE_ENV } from "./utils/secrets";
import morgan from "morgan";
import fs from "fs";
import RouteHandler from "./routes/routeHandler";
import cookieParser from "cookie-parser";
import path from "path";
import helmet from "helmet";
import multer from "multer";
// import { NODE_ENV } from "./utils/secrets";

const app : Express = express();

// Middlewares    
app.disable('x-powered-by');

if(NODE_ENV === "production") {
    app.use(helmet());  //HTTP Header security middleaware
}

app.use(morgan('dev'));     //HTTP middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })) 
app.use(cookieParser());

// For File Upload
if(!fs.existsSync('./uploads')) {
    fs.mkdirSync("./uploads");
}

// Index route - Home route
app.get("/", (req :Request, res: Response) => {

    res.json({
        status: "NGO-TECH Project Explorer Server Active",
        type: `${req.method} request`
    })
})

// ROUTES - Create new instance of route handler class by instantiating it with the app object and use the loadRoutes method() to dynamically load and mount all the routes
const routeHandler = new RouteHandler(app);
routeHandler.loadRoutes();

// General (Custom) Error middleware handler 
app.use((error:Error, req:Request, res: Response, next: NextFunction) => {

    let err:any = error;
    // If error is a multer Error, the status is  400 and the error is the error message
    if (error instanceof multer.MulterError) {
        err.status = 400;
        err.error = err.message;
    }

    return res.status(err?.status || 500).json({
        error: err.error || "Internal Server Error.",
        errorMessage: err.message || "Something went wrong.",
        success: false,
        status: err.status || 500
    })

});


// Invalid routes and/or requests
app.use("*", (req: Request, res: Response) => {
    res.status(404).send({
        error: "Endpoint does not exist",
        success: false,
        status: 404
    })
})
export default app;