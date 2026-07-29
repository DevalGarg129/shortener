import mongoose from "mongoose";

const connectDb = async () => {
    try{
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected");
    }catch(error){
        console.error("Database connection failed");
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDb;