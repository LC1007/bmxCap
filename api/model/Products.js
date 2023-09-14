const db = require('../config')

class Products {
  static async fetchProducts() {
    try {
      const query = `SELECT bmxID, prodName, prodDesc, quantity, amount, category, prodUrl FROM Products`;
      const [results] = await db.query(query);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async fetchProduct(bmxID) {
    try {
      const query = `SELECT bmxID, prodName, prodDesc, quantity, amount, category, prodUrl FROM Products WHERE bmxID = ?`;
      const [result] = await db.query(query, [bmxID]);
      return result;
      
    } catch (error) {
      throw error;
    }
  }

  static async createProduct(product) {
    try {
      const query = `INSERT INTO Products SET ?`;
      const [result] = await db.query(query, [product]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(product, bmxID){
    try {
      const query = `UPDATE Products SET ? WHERE bmxID = ?`
      const [result] = await db.query(query, [product, bmxID])
      return result
    } catch (error) {
      throw error
    }
  }

  static async deleteProduct(bmxID){
    try {
      const query = `DELETE FROM Products WHERE bmxID = ?`;
      const [result] = await db.query(query, [bmxID]);

      return result;
    } catch (error) {
      console.log('An error occurred while trying to delete the product:', error);
    }
  }

  static async findProduct(prodName){
    try {
      const query = `SELECT bmxID, prodName, prodDesc, quantity, amount, category, prodUrl FROM Products WHERE prodName LIKE ?`
      const [result] = await db.query(query, ['%' + prodName + '%'])
      return result
    } catch (error) {
      console.log('An error occurred while trying to find the product:', error);
    }
  }

  // Featured Products

  static async featuredProducts(){
    try {
      const query = `SELECT bmxID, prodName, prodDesc, quantity, amount, category, prodUrl FROM Products LIMIT 4`
      const [results] = await db.query(query)

      return results
    } catch (error) {
      
    }
  }
}

module.exports = Products