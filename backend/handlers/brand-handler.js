const Brand = require("../db/brand");

//CRUD OPERATIONS
//Read logic

async function getBrands() {
  let brands = await Brand.find();
  return brands.map((b) => b.toObject());
}

//Creation logic

async function addBrand(model) {
  let brand = new Brand({
    name: model.name,
  });
  await brand.save();
  return brand.toObject();
}

//updation logic
async function updateBrand(id, model) {
  await Brand.findByIdAndUpdate(id, model, { new: true });
  return;
}

//Delete logic
async function deleteBrand(id) {
  await Brand.findByIdAndDelete(id);
  return;
}

module.exports = { getBrands, addBrand, updateBrand, deleteBrand };
