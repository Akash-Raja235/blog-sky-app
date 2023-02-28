
import dotenv from 'dotenv'; 
dotenv.config();
import 'express-async-errors'
import cors from 'cors'
import express from 'express'
const app = express();
import connectDB from './database/db.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import UserRouter from './routes/route.js'
 import auth_middleware from './middleware/authorization.js'
import PostRouter from './routes/PostRouter.js' 

app.use(cors())
app.use(express.json())
app.use("/public", express.static("public"));

app.use("/api/v1", UserRouter);
app.use("/api/v1/post",auth_middleware, PostRouter);

// app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000

const  start = async()=>{

    try {
        // connect D
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () =>
          console.log(`server is listing on port ${PORT}`)
        );
    } catch (error) {
        console.log(error)
    }

}

  start();