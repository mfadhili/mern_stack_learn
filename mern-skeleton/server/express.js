import  express  from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import  template  from "./../template";
import userRoutes from './routes/user.routes'
import  authRoutes  from "./routes/auth.routes";

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

//mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)

app.get('/', (req,res)=>{
    res.status(200).send(Template())
})

// added to catch errs from authrelated errors

app.use((err, req,res, next) => {

    //express-jwt throws error named 'UnathorizedError' when a token cannot be validated 
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error": err.name + ": " + err.message})
    }else if (err) {
        // for any server side errors are caught
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})
export default app;