//Load database configuration file and allow us read environment variables
require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const app = express();
const http = require("http");
const PORT = process.env.PORT || process.env.SERVER_PORT
const cookieParser = require("cookie-parser");
// const cors = require('cors');

// To allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
});
// app.use(cors());

//To allow json requests and decode requests from forms
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//To allow Cookies
app.use(cookieParser());

// app.use(cors());

//Routes
// app.use('/', require("./controllers/auth"));
app.use('/api', require("./controllers/home"));
app.use('/api', require("./controllers/user"));
app.use('/api', require("./controllers/project"));



//Invalid Route     //NB: using app.use instead of app.get/post handles all wrong requests and throws the message
app.use('*', (req, res) => {
    res.status(404).send({error: "Route does not exist"})
})


//Server setup
const server = http.createServer(app)
//If any error in starting server
server.on('error', (err) => {
    console.log(`Error Present: ${err}`);
    process.exit(1);
})
//Starting Server/Listening to server
server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})

// app.listen(PORT, () => {
//     console.log(`Server listening on Port ${PORT}`);
// })