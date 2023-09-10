const db = require("../config");

class Orders {
  static async addToCart(userID, bmxID) {
    try {
      const query = `INSERT INTO Orders (userID, bmxID, prodName, amount, prodUrl)
                     SELECT u.userID, p.bmxID, p.prodName, p.amount, p.prodUrl
                     FROM Users u
                     CROSS JOIN Products p
                     WHERE u.userID = ? AND p.bmxID = ?;`;
      const [result] = await db.query(query,[userID, bmxID])
      return result
    } catch (error) {
        console.log(error);
    }
  }

  static async fetchOrders(userID){
    try {
        const query = `SELECT orderID, userID, bmxID, prodName, amount, prodUrl, orderDate FROM Orders WHERE userID = ?`;
        const [results] = await db.query(query, [userID]);
 
        return results;
    } catch (error) {
        console.log(error);
    }
  }

  static async deleteOrder(orderID){
    try {
      const query = `DELETE FROM Orders WHERE orderID = ?`
      const [result] = await db.query(query, [orderID])

      return result
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Orders;
