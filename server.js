const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const proxy = require("express-http-proxy");
const app = express();

dotenv.config();

app.disable('x-powered-by');

app.use(express.json());
app.use("*", cors());

app.get("/", (req, res) => {
	res.send("API is Running");
});

/*
	This is the gateway which is directly exposed to the clients to retrieve data. For security purposes this gate way restricts direct access to the services.
*/
 
app.use("/user", proxy("http://4.156.79.89")); 
app.use("/product", proxy("http://4.157.128.202")); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => console.log(`Server Started on port ${PORT}..`));

process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

module.exports = { app, server };
