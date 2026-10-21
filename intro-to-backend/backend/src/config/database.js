import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}`
        )
        console.log(`\n we are connected to mongo db ${process.env.host}`)
    }
    catch(error){
        console.log("mongodb connection failed ", error);
        error.exit(1);
    }
}

export default connectDB;