import mongoose from "mongoose";

const PastrySchema = new mongoose.Schema({
  name: String,
  number: Number,
  order: Number
})

const PastryModel = mongoose.model('Pastry', PastrySchema, 'pastries');

export default PastryModel;
