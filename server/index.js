const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const exerciseRoute = require('./routes/ExerciseRoutes');
const env = require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

//middlewares for parsing json data
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

//mongo db connection
const uri = process.env.URI;
mongoose.connect(uri , { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
     console.log('connected to db');
})

//redirecting to correct routes
app.use('/api/exercises', exerciseRoute);
app.use('/api/auth', authRoute);


app.listen(5000, ()=>{
    console.log('listening to port 5000');
});