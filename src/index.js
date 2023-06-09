require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require('express');

const userRoutes = require('./routes/users');

const middlewareLogRequest = require ('./middleware/logs');
const upload = require('./middleware/multer');

const app = express();

const hostname = require('./utils/localhost');


// const manggoRouter = require('./routes/manggo.js');
// app.use('/predict/manggo', manggoRouter);
// app.use('/upload', uploadRouter);


app.use(middlewareLogRequest);
app.use(express.json());
app.use('/assets',express.static('public/images'));

app.use('/users', userRoutes);
app.post('/upload',upload.single('photo'),(req, res) => {
    res.json({
        message: 'Upload berhasil'
    });
});

app.post('/detect-disease',upload.single('disease'),(req, res) => {
    res.json({
        message: 'Disease Berhasil'
    });
});

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server berhasil di running di port ${PORT}`);
});