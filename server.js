const express = require('express');
const mongoose= require('mongoose'); // mongoose
const hobbies = require('./routers/HobbiesRoute'); // import the router:


const app = express();
const PORT = 3000;

app.use(express.static("public"));

// middleware - תווכה
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// use the router for hobbies:
app.use('/hobbies',hobbies);

// Connect to MongoDB using mongoose - to Stock database.
mongoose.connect('mongodb://localhost:27017/Life',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});



app.listen(PORT, () => console.log(`Listening in port ${PORT}`));