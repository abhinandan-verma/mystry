import mongoose from "mongoose";
import colors from "@colors/colors"
import { cn } from "./utils";

type ConnenctionObject = {
    isConnected?: number;
}

const connection: ConnenctionObject = {};


async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already Connected".cyan);
        return
    }

    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})

        console.log("db: ".cyan+ db)

       connection.isConnected =  db.connections[0].readyState

       console.log("DB connected successfully :)".cyan)

       console.log("db connection: ".brightYellow,  db.connections )

    }catch(error){

        console.log("Database connection  Failed: ".red, error)

        process.exit(1)
    }
}

export default dbConnect;
    
