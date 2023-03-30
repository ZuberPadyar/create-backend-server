const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});

const port=process.env.PORT

require("./db/conn")
const User = require("./models/userSchema")


app.use(express.json());

app.use(require("./router/auth"))


app.get("/", (req, res) => {
    res.send("Hello Brother")
});


const middleware = (req, res, next) => {
    console.log("i am middleware");
    next()

}
app.get("/about", middleware, (req, res) => {
    res.send("Hello Brother I am about section")
});
app.get("/user", (req, res) => {
    
    res.send("Hello Brother I am user section")
});

app.listen(port, () => {
    console.log("I am Localhost");
})