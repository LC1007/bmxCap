const Products = require('../model/Products')

module.exports = {
  async fetchProducts(req, res) {
    try {
        // const data = req.body;
        // await Products.createProduct(data);

        const products = await Products.fetchProducts()

        return res.json({
          status: res.statusCode,
          products,
        });
    } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "An error occurred while creating the product" });
    }
  },

  async fetchProduct(req, res){
    try {
        const { prodID } = req.params;
        const product = await Products.fetchProduct(prodID);
        
        return res.json({
          status: res.statusCode,
          product,
        });
    } catch (error) {
        
    }
  },

  async createProduct(req, res){
    try {
        const data = req.body
        const product = await Products.createProduct(data)

        return res.json({
          status: res.statusCode,
          msg: 'Product has been created',
          product,
        });
    } catch (error) {
        
    }
  }

};