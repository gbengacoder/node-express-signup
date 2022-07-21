const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const routeUrls = require('./routes/routes')
const app = express()
env.config()

app.use(express.json())


mongoose.connect(process.env.MONGO_URL,
      () => {
        console.log("db conn");
      }
    );
      
    mongoose.connection.on("disconnected", () => {
      console.log("mongodb disconnected");
    });


  
 app.use('/app' , routeUrls )

app.listen('8080' , () => console.log('listening on port 8080'))