const express = require("express");
const router = express.Router();
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
} = require("../handlers/product-handler");
 
//create Api
router.get("", async (req, res) => {
  let result = await getProducts();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  let id = req.params["id"];
  let result = await getProductById(id);
  res.send(result);
});

//create Api
router.post("", async (req, res) => {
  let model = req.body;
  let result = await addProduct(model);
  res.send(result);
});

//update Api
router.put("/:id", async (req, res) => {
  let model = req.body;
  let id = req.params["id"];
  await updateProduct(id, model);
  res.send({ message: "OK Update Success" });
});

//Delete Api
router.delete("/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteProduct(id);
  res.send({ message: "Product Deleted" });
});

module.exports = router;
