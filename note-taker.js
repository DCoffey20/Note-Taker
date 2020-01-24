const express = require("express");
const path = require("path");
const fs = require("fs");

let app = express();
let data = JSON.parse(fs.readFileSync("./db/db.json"))
let idArray = [];
// let i = 0;
let counter = 0;
let j = 0;

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// GET for HTML pages, js, and css files
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

// API GET, POST, and Delete
app.get("/api/notes", function (req, res) {
    res.json(data);
    idArray = data.map(data => data.id)
    // console.log(data)
})
app.post("/api/notes", function (req, res) {
    // console.log(data.length)
    // i = data.length - 1;
    // id.push(data[i].id);
    if (data.length === 0) {
        // data.id =1;
        counter = req.body;
        counter.id = 1;
        idArray.push(counter.id);
        // console.log(id);
    } else if (data.length > 0) {
        // i = data.length - 1;
        counter = req.body;
        j = Math.max(...idArray);
        j++;
        counter.id = j;
        idArray.push(counter.id);
        // console.log(id);
        // console.log(counter);
    };
    // data.push(req.body);
    data.push(counter);
    fs.writeFile("./db/db.json", JSON.stringify(data), "utf8", (err, data) => { if (err) throw err; return res.status(204).send() })

})
app.delete("/api/notes/:id", function (req, res) {
    // console.log(req.params.id);
    // let del = req.params.id -1;
    let del = parseInt(req.params.id);
    for (let k = 0; k < data.length; k++) {
        // console.log(del);
        // console.log(data[k].id);
        if (del === data[k].id) {
            data.splice(k, 1);
            // console.log(k)
        };
    };

    // data.splice(del,1);
    // console.log(data[0].id);
    // console.log(del)
    // console.log(data)
    fs.writeFile("./db/db.json", JSON.stringify(data), "utf8", (err, data) => { if (err) throw err; return res.status(204).send()})

})

app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT)
});