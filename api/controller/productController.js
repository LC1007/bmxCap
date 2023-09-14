const Products = require("../model/Products");

module.exports = {
  async fetchProducts(req, res) {
    try {
      const products = await Products.fetchProducts();

      if (!products) {
        return res.status(404).json({
          status: 404,
          msg: "Products not found",
        });
      }

      return res.json({
        status: res.statusCode,
        products,
      });

    } catch (error) {
      console.error(
        "An error occurred while trying to fetch the products:",
        error
      );
      res.status(500).json({ error: "Failed to fetch the products" });
    }
  },

  async fetchProduct(req, res) {
    try {
      const { bmxID } = req.params;
      const result = await Products.fetchProduct(bmxID);

      if (!result) {
        return res.status(404).json({
          status: 404,
          msg: "Product not found",
        });
      }

      return res.json({
        status: res.statusCode,
        ID: result[0].bmxID,
        result,
      });

    } catch (error) {
      console.error(
        "An error occurred while trying to fetch the product:",
        error
      );
      res.status(500).json({ error: "Failed to fetch the product" });
    }
  },

  async createProduct(req, res) {
    try {
      const data = req.body;
      const product = await Products.createProduct(data);

      return res.status(201).json({
        status: 201,
        msg: "Product has been created",
        product,
      });

    } catch (error) {
      console.error(
        "An error occurred while trying to create the product:",
        error
      );
      res.status(500).json({ error: "Failed to create the product" });
    }
  },

  async updateProduct(req, res) {
    try {
      const data = req.body;
      const { bmxID } = req.params;
      const product = await Products.updateProduct(data, bmxID);

      return res.json({
        status: res.statusCode,
        msg: "Product has been updated",
        product,
      });

    } catch (error) {
      console.error(
        "An error occurred while trying to update the product:",
        error
      );
      res.status(500).json({ error: "Failed to update the product" });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { bmxID } = req.params;
      const product = await Products.deleteProduct(bmxID);

      if (product.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          msg: "Product not found",
        });
      }

      return res.json({
        status: res.statusCode,
        msg: "Product has been deleted",
        product,
      });

    } catch (error) {
      console.error(
        "An error occurred while trying to delete the product:",
        error
      );
      res.status(500).json({ error: "Failed to delete the product" });
    }
  },

    async findProduct(req, res){
      try {
        const { prodName } = req.params
        const product = await Products.findProduct(prodName)

        if(product.affectedRows === 0){
          return res.status(404).json({
            status: 404,
            msg: "Product not found",
          });
        }

        return res.json({
          status: res.statusCode,
          product,
        });
        
      } catch (error) {
        console.error(
          "An error occurred while trying to find the product:",
          error
        );
        res.status(500).json({ error: "Failed to find the product" });
      }
    },

    async featuredProducts(req, res){
      try {
        const products = await Products.featuredProducts()

        if(products.affectedRows === 0){
          return res.status(404).json({
            status: 404,
            msg: 'Products not found'
          })
        }

        return res.json({
          status: res.statusCode,
          products
        })
      } catch (error) {
        console.error(
          "An error occurred while trying to fetch the products:",
          error
        );
        res.status(500).json({ error: "Failed to fetch the products" });
      }
    }
};
