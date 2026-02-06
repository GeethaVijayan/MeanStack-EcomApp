const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name:String,
    shortdescription:String,
    description:String,
    price:Number,
    discount:Number,
    images:Array(String),
    categoryId:{
            type: Schema.Types.ObjectId, // This specifies the field will store an ObjectId
            ref: 'Category'            // This tells Mongoose which model the ObjectId refers to
        }
})
const Products = mongoose.model('products',productSchema)
module.exports = Products