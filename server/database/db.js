import mongoose  from "mongoose";

export const connectDB =  ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"LIBARAY MANAGMENT SYSTEM"
    }).then(()=>{
        console.log(`Database connected succesfully`)
    }).catch(err=>{
        console.log(`Error connected to database`,err)
    })
}