import express from 'express'
import mongoose from 'mongoose'
import dbConfig from './configs/db.config.js'
import serverConfig from './configs/server.config.js'
import userModel from './models/user.model.js'
import authRouter from './routes/auth.route.js'
import bcrypt from 'bcryptjs'
import bookRouter from './routes/bookOp.route.js'
import cors from 'cors'
import userRouter from './routes/userOp.route.js'
import transactionRoutes from './routes/transaction.route.js'

const app = express()
app.use(express.json())
app.use(cors());
authRouter(app)
bookRouter(app)
userRouter(app)
transactionRoutes(app)

app.use(cors({
    origin: `http://localhost:${serverConfig.FRONTENDPORT}` // Allow only your React app to access the API
  }));


mongoose.connect(dbConfig.URI)
const db = mongoose.connection

db.on("error",()=>{
    console.log("Error occured while connecting to the database !")
})
db.on('open',()=>{
    console.log("Connected to the database")
    init()
})


const init = async()=>{
    try{
        let adminUser = await userModel.findOne({userType : "ADMIN"})
        if(!adminUser){
            //creating a new admin
            adminUser = {
                name : "Pranab Kumar Dwibedi",
                userId : "pranab",
                email : "kumarpranab870@gmail.com",
                mobileNo : 6372266133,
                password : bcrypt.hashSync("pranab@BCET",8),
                userType : "ADMIN"
            }
            const resAdminUser = await userModel.create(adminUser);
            console.log("Admin is created !",resAdminUser)
            return
        }
        console.log("Admin is already present !")
    }catch(err){
        console.log("Error while checking admin !")
    }
    
}

app.listen(serverConfig.PORT,()=>{
    console.log("Server started at :", serverConfig.PORT);
})