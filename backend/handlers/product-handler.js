const { model } = require("mongoose");
const Product = require("../db/products");

//adding in db create
async function addProduct(model) {
  let product = new Product({
    ...model
  });
  await product.save();
  return product.toObject();
}

//Read logic

async function getProducts() {
  let products = await Product.find()
  return products.map(product => product.toObject());
}

async function getProductById(id) {
  let product = await Product.findById(id)
  return product.toObject();
}

//updation logic
async function updateProduct(id,model) {
  await Product.findByIdAndUpdate(id, model, { new: true });
  return;
}

//Delete logic
async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
  return;
}

module.exports = { addProduct, updateProduct,deleteProduct,getProducts,getProductById };
