// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

const { MONGODB_URI, MONGODB_DEV_URI, NODE_ENV, JWT_SECRET_KEY } = process.env;

const requiredCreds : string[] = ['MONGODB_URI',  'JWT_SECRET_KEY', 'NODE_ENV' ];

for (const cred of requiredCreds) {
    if (!process.env[cred]) {
        console.error(`Missing required environment variable: ${cred}`);
        process.exit(1);
    }
}

export {
    MONGODB_URI, 
    MONGODB_DEV_URI,
    NODE_ENV,
    JWT_SECRET_KEY
}