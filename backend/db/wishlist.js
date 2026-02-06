const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
  userId : {type: Schema.Types.ObjectId,ref:'User'},
  productId :Array(String)
})
const wishlistItem = mongoose.model('wishlistItem',wishlistSchema);
module.exports = wishlistItem
