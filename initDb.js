import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import PastryModel from "./Models/Pastry.js";
import pastries from './pastries.js';

mongoose.connect(`mongodb://${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/yam`).then(async ()=>{
    await PastryModel.remove({});
    await PastryModel.insertMany(pastries);
    console.log('DB initialized');
    mongoose.disconnect();
});
