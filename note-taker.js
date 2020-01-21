const express = require("express");
const path = require("path");
const fs = require("fs");

let app = express();

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",function(req, res){
    res.sendFile(path.join(__dirname, "index.html"))
})
app.get("/")