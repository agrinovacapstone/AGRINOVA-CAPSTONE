const express = require('express');
const http = require('http');
const app = express();
const porthttp = process.env.PORT_HTTP || 4000;
const hostname = require('./utils/localhost');
// const indexRouter = require('./routes/index');
// const tomatoRouter = require('./routes/tomatopred');
// const uploadRouter = require('./routes/upload');


app.use(express.json());
app.use(express.urlencoded({extended: false}));


const httpServer = http.createServer(app);


// httpServer.listen(porthttp, () => {
//     console.log(`Server berjalan pada host ${hostname} dan port ${porthttp}`);
// });
