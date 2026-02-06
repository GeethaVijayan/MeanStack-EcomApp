const express = require("express");
const router = express.Router();
const {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
} = require("../handlers/brand-handler");

// Get all brands
router.get("/", async (req, res) => {
  try {
    const brands = await getBrands();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new brand
router.post("", async (req, res) => {
  try {
    let model = req.body;
    const brand = await addBrand(model);
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a brand
router.put("/:id", async (req, res) => {
  try {
    let model = req.body;
    let id = req.params["id"];
    await updateBrand(id, model);
    res.json({ message: "Brand updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a brand
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params["id"];
    await deleteBrand(id);
    res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
