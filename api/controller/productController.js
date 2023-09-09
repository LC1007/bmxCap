const Products = require('../model/Products')

module.exports = {
  async fetchProducts(req, res) {
    try {
        const products = await Products.fetchProducts()

        return res.json({
          status: res.statusCode,
          products,
        });
    } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching products" });
    }
  },

  async fetchProduct(req, res){
    try {
        const { bmxID } = req.params;
        const [result] = await Products.fetchProduct(bmxID);
        
        if (!result) {
    
          return res.status(404).json({
            status: 404,
            msg: "Product not found",
          });
        } 

          return res.json({
            status: res.statusCode,
            bmxID: result.bmxID,
            result
          });
        

    } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while fetching the product" });
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
        res
          .status(500)
          .json({ error: "An error occurred while creaeting the product" });
    }
  }

};