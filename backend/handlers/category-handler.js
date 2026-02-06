const { model } = require("mongoose");
const Category = require("../db/category");

//adding in db create
async function addCategory(model) {
  let category = new Category({
    name: model.name,
  });
  await category.save();
  return category.toObject();
}

//Read logic

async function getCategories() {
  let categories = await Category.find()
  return categories.map(category => category.toObject());
}

async function getCategoryById(id) {
  let category = await Category.findById(id)
  return category.toObject();
}

//updation logic
async function updateCategory(id,model) {
  await Category.findByIdAndUpdate(id, model, { new: true });
  return;
}

//Delete logic
async function deleteCategory(id) {
  await Category.findByIdAndDelete(id);
  return;
}

module.exports = { addCategory, updateCategory,deleteCategory,getCategories,getCategoryById };
