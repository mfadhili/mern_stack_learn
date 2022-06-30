import * as express from "express";
import devBundle from './devBundle' // for development only

import path from 'path' // added to make the static files available in client side
import template from './../template' // template to be rendered from /

import { MongoClient } from "mongodb";

const CURRENT_WORKING_DIR= process.cwd()
// const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/mernSimpleSetup'

// MongoClient.connect(url, (err, db) => {
//     console.log("Connected successfully to mongodb server")
//     db.close()
// }) // Mongo client


let port = process.env.PORT || 3000;


const app = express() // Node server application
devBundle.compile(app) // for development only, will be ompiled by webpack to dist/bundle.js

app.use('/dist',express.static(path.join(CURRENT_WORKING_DIR))) // configures express appp to return the static files from /dist when request starts with /dist

app.get('/',(req,res)=>{
    res.status(200).send(template())
})

app.listen(port,function onStart(err) {
    if (err) {
        console.log(err)
    }
    console.log('Server started on port %s',port)
})