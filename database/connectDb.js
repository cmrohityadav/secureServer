import mongoose from "mongoose";

const MAX_RETRIES=3;
const RETRY_INTERVAL=5000;

class DatabaseConnection{
    constructor(){
        this.retryCount=0;
        this.isConnected=false;

        //configure mongoose settings
        mongoose.set("strictQuery",true);

        mongoose.connection.on('connected',()=>{
            console.log("MONGODB CONNECTED seccessfully");
            this.isConnected=true;
        })

        mongoose.connection.on('error',()=>{
            console.log("MONGODB CONNECTED ERROR");
            this.isConnected=false;
            
        })

        mongoose.connection.on('disconnected',()=>{
            console.log("MONGODB disCONNECTED ");
            this.isConnected=false;
            
        })
    }

    async connect(){
        if(!process.env.MONGO_URI){
            throw new Error("Mongo db uri is not define in env variable");
        }

        const connectionOptions={
            useNewUrlPParser:true,
            useUnifiedTopology:true,
            maxPoolSize:10,
            serverSelectionTimeoutMS:5000,
            socketTimeoutMS:45000,
            family:4, //IPv4
        }

        if(!process.env.NODE_ENV=='development'){
            mongoose.set('debug',true);
        }

        await mongoose.connect(process.env.MONGO_URI,connectionOptions);
        this.retryCount=0; // reset retry count on seccuss


    }
}
