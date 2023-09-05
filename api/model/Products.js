const db = require('../config')

class Products{
    static async fetchProducts(){
        try {
            const query = `SELECT bmxID, prodName, prodDesc, quantity, amount, category, prodUrl FROM Products`;
            const [results] = await db.query(query) 
            return results
        } catch (error) {
            throw error;
        }
    }

    static async fetchProduct(prodID){
        try {
            const query = `SELECT bmxID, prodName, prodDesc, quantity, amount, category, prodUrl FROM Products WHERE prodID = ?`;
            const [result] = await db.query(query, [prodID])
            return result
        } catch (error) {
            throw error;
        }
    }

    static async createProduct(product){
        try {
            const query = `INSERT INTO Products SET ?`
            const [result] = await db.query(query, [product])
            return result
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Products