const express = require("express");
const path = require("path");
const fs = require("fs");

let app = express();
let data = JSON.parse(fs.readFileSync("./db/db.json"))
let id=[];

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// GET for HTML pages, js, and css files
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

// API GET, POST, and Delete
app.get("/api/notes", function(req, res){
    res.json(data)
    console.log(data[0].id)
})
app.post("/api/notes", function(req, res){
    data.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(data), "utf8", (err, data) => {if(err)throw err})

})
// app.delete("/api/notes", function(req, res){
//     
// })

app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT)
});