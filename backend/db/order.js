const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    date:Date,
    items:Arrray(any),
    status:Number
})
const Orders = mongoose.model('orders',orderSchema);
module.exports = Orders;