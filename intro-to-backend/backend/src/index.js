import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

dotenv.config(
    {
        path:'./.env'
    }
)

const StartServer = async () => {
    try {
        console.log("MONGOURI: ", process.env.MONGODB_URI)
        await connectDB();
        app.on("error", (error)=>{
            console.log("ERROR", error);
            throw error
        })

        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`server is running on port number : ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("mongodb connection failed", error)
    }
}

StartServer();