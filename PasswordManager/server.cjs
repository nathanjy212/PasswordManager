const express = require('express');
// const pokemon = require('./backend/pokemon.api.cjs');
// const users = require('./backend/user.api.cjs')
const passwordManager = require('./backend/passwordManager.api.cjs');
const users = require('./backend/user.api.cjs')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// need to add this for deployment
const path = require('path')

const app = express();




// after i copy and paste the code from MongoDB seems like we need to put it in quotes
// this whole code block is needed to get mongoDB started
const mongoDBEndpoint = 'mongodb+srv://nathanjy212:banana1234@passwordmanagerwebdev.mo8ek7l.mongodb.net/?retryWrites=true&w=majority&appName=PasswordManagerWebDev'
mongoose.connect(mongoDBEndpoint, {
    useNewUrlParser: true,
})
const db = mongoose.connection;
db.on('error', console.error.bind('Error connecting to MongoDB'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/passwordManager', passwordManager);
// app.use('/api/pokemon', pokemon);
app.use('/api/users', users);


// need to add this for deployment
let frontend_dir = path.join(__dirname, 'dist')
app.use(express.static(frontend_dir))
app.get('*', function (req, res) {
    console.log("received request")
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


// app.listen(8000 || process.env.PORT, function() {
//     console.log("Starting app now...")
// })
app.listen(process.env.PORT || 8000, function() {
    console.log("Starting app now...")
})

// app.listen(8000, function() {
//     console.log("Starting app now...")
// })


// app.get('/', function(req, res) {
//     res.send("This is the FIRST GET request")
// });

// app.get('/', function(req, res) {
//     res.send("This is SECOND GET request");
// })

// app.get('/', function(req, res) {
//     res.send("This is THIRD GET request");
// })

// app.put('/', function(req, res) {
//     res.send("This is a PUT request")
// })