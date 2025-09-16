// INFO: App.js File

const express = require('express');
const mongoose = require('mongoose');

const port = process.env.port || 3001;
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// INFO: Router File
const allRoutes = require("./routes/allRoutes")

// INFO: Auto refresh
const path = require('path');
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require('connect-livereload');
app.use(connectLivereload());

liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 100);
});

mongoose
    .connect(
        'mongodb+srv://ahmadabdallah:YRjlapMjuw39qTpC@nodedb.t1y2uku.mongodb.net/all-data?retryWrites=true&w=majority&appName=NodeDB'
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}/`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// INFO: OverRide Method
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(allRoutes)
