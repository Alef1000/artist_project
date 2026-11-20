const express = require("express");
const multer = require("multer");
const path = require("path")
const fs = require("fs")
const util = require("util")
const unlinkFile = util.promisify(fs.unlink)
const {google} = require("googleapis")
const dotenv = require("dotenv").config()

const port = 3000;
const app = express()

const FOLDER_ID = process.env.FOLDER_ID;
const GOOGLE_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const uploadDir = path.join(__dirname, "public", "uploads", "images")

const drive = google.drive({
    version: "v3"
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/images/")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + "-" + uniqueSuffix)
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|heif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(new Error("File upload only supports the following filetypes - " + filetypes));
    }
}).single("fileToUpload")

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

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/"))

app.use(express.static(path.join(__dirname, "/public")))

app.get("/", (req, res) => {
res.render("index")
});

app.post("/upload", function (req, res) {
        upload(req, res, async (err) => {
            if(!err && req.file != "") {
                res.status(200).send("Success!")
            } else if (err) {
                return res.status(400).send(err.message)
            }
        })

})
/*
        try {
            const { data } = await drive.files.create({
                requestBody: {
                    name: Date.now() + "-" + req.file.originalname,
                    parents: [FOLDER_ID]
                },
                meida: {
                mimetype: req.file.mimetype,
                body: Readable.from(req.file.buffer)
                },
                fields: "id, name",
                supportsAllDrives: true
            });
            res.json(data);
        } catch (e) {
            console.error(e);
            res.status(500).send("Drive upload failed");
        }
*/
/*
app.get("/api/images", async (req, res) => {
    try {
        const { data } = await drive.files.list({
            q: `"${FOLDER_ID}" in parents and mimeType contains "image/" and trashed = false`,
            fields: "files(id, name, createdTime)",
            orderBy: "createdTime desc",
            pageSize: 100,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true
        });

        res.json(data.files);
    } catch (e) {
        console.error(e);
        res.status(500).send("Could not list all images");
    }
});
*/
app.get("/uploads/images", async function (req, res) {
    try {
        const imageData = await fs.promises.readdir(uploadDir);
        const images = imageData.map(file => ({
            name: file,
            url: `/uploads/images/${file}`
        }));

        res.json(images)
    } catch (e) {
        console.error(e);
        res.status(500).send("Could not list all images");
    };
    
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})