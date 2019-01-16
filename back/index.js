const express = require('express');
const multer = require('multer');

const app = express();

const upload = multer({
    dest: './uploads/'
})

app.post('/upload', upload.single('files'), (req, res) => {
    res.json({files: req.file})
})

// app.use()


app.listen(3344, () => console.log("running on localhost:3344"))
