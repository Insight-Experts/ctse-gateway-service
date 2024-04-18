const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const proxy = require("express-http-proxy");
const app = express();

dotenv.config();

app.use(express.json());
app.use("*", cors());

app.get("/", (req, res) => {
	res.send("API is Running");
});

/*
	This is the gateway which is directly exposed to the clients to retrieve data. For security purposes this gate way restricts direct access to the services.
*/
 
app.use("/user", proxy("http://172.214.8.85")); 
app.use("/product", proxy("http://4.255.89.70")); 

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => console.log(`Server Started on port ${PORT}..`));

module.exports = { app, server };
