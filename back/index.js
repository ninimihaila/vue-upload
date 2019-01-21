const express = require('express');
const multer = require('multer');

const app = express();


const fileFilter = function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Wrong file type");
        error.code = "LIMIT_FILE_TYPES";

        return cb(error, false);
    }

    cb(null, true);
}

const MAX_SIZE = 2000000;

const upload = multer({
    dest: './uploads/',
    fileFilter,
    limits: {
        fileSize: MAX_SIZE
    }
})

app.post('/upload', upload.array('files'), (req, res) => {
  res.json({files: req.files})
})

app.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_TYPES") {
        res.status(422).json({error: "Only images are allowed"});
    }

    if (err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({error: "Too large"});
    }

    return
})


app.listen(3344, () => console.log("running on localhost:3344"))
