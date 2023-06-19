import http from 'http';
import { connectToDB } from "./config/db";
import app from "./app";

const PORT: string | number = process.env.PORT || 4000;
const server = http.createServer(app)

// Connect to the database and start the server
connectToDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is listening on PORT ${PORT}`);
        })
    }).catch((err: any) => {
        console.error('Database connection failed!', err)
    })

// If any error in starting server
server.on("error", (err) => {
    console.log("Server Error Present: ", err);
    process.exit(1);
})

// If any warning from process event
process.on('warning', (msg) => {
    console.warn("WARNING!! ", msg);
})

// If any unhandledRejection in our process Event
process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION! Shutting down...", err);
    process.exit(1);
})