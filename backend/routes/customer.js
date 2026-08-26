const express = require('express');
const router = express.Router();
const { getNewproducts, getFeaturedproducts } = require('../handlers/product-handler');

router.get("/home/new-products", async (req,res)=>{
    try{
 let newProducts = await getNewproducts();
    res.send(newProducts);
    }catch(err){
    res.status(500).send({message:"Error fetching new products", error: err.message});
    }
})

router.get("/home/featured-products", async (req,res)=>{
    let featuredProducts = await getFeaturedproducts();
    res.send(featuredProducts);
})


module.exports = router;