import mongoose  from "mongoose";

export const connectDB =  ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"library_management_system"
    }).then(()=>{
        console.log(`Database connected succesfully`)
    }).catch(err=>{
        console.log(`Error connected to database`,err)
    })
}