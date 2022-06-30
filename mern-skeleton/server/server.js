import config from "../config/config";
import app from "./express";
import mongoose, { connection } from 'mongoose'

mongoose.Promise = global.Promise // uses native ES^ promises
mongoose.connect(config.mongoUri,{useNewUrlParser:true})

// used this connection procedure after the former one had issues
const db = mongoose.connection
db.once('open', _ => {
    console.log('Databse connected: ', config.mongoUri)
})
db.on('error', err =>{
    console.error('connection error: ', err)
})
// mongoose.connect(config.mongoUri,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }) // handle connection to Database
// //  mongoose.connection.on('error', ()=>{
//      throw new Error(`unable to connect to database: ${config.mongoUrl}`)
//  })

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info(`Server started on http://localhost/${config.port}`);
});



