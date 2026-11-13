const express = require("express");
const multer = require("multer");
const path = require("path")
const fs = require("fs")
const util = require("util")
const unlinkFile = util.promisify(fs.unlink)

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cb(null, "./public/uploads/images")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, file.filename + "-" + uniqueSuffix)
    }
})

const uplaod = multer({ 
    storage:storage,
    limits: {fileSize: 10000000},
}).any()

function checkFileType (file, cb) {
    const fileTypes = /jpeg|png|jpg/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(mimetype && extname) {
        return cb(null, true)
    } else {
        cb("Webiste only acceps images")
    }
}

const port = 3000;

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/"))

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/uploads", function (req, res) {
    uplaod(req, res, (err) => {
        if(!err && req.files != ""){
            res.status(200).send()
        }
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})