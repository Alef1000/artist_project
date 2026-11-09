const express = require("express");
const multer = require("multer");
const path = require("path")
const fs = require("fs")
const util = require("util")
const unlinkFile = util.promisify(fs.unlink)

const port = 3000;

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine", "ejs")

app.use(express.static("public"))

app.set("views", path.join(__dirname, "/"))

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})