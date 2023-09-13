const db = require('../config')

class User {
  static async createUser(user) {
    try {
      const [result] = await db.query("INSERT INTO Users SET ?", [user]);
      return result.insertId;
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }

  static async fetchUsers(){
    try {
      const query = `SELECT userID, firstName, lastName, gender, userDOB, emailAdd, userPass, profileUrl, userRole FROM Users`
      const [results] = await db.query(query)
      return results
    } catch (error) {
      console.error("Error in fetching users:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }

  static async fetchUser(userID){
    try {
      const query = `SELECT userID, firstName, lastName, gender, userDOB, emailAdd, userPass, profileUrl, userRole FROM Users WHERE userID = ?`;
      const [result] = await db.query(query, [userID])

      return result
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUser(user, userID){
    try {
      const query = `UPDATE Users SET ? WHERE userID = ?`
      const [result] = await db.query(query,[user, userID])

      return result
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(userID){
    try {
      const query = `DELETE FROM Users WHERE userID = ?`
      const [result] = await db.query(query,[userID])

      return result
    } catch (error) {
      console.log(error);
    }
  }

  static async findUserByEmail(emailAdd) {
    try {
      console.log("Trying to find user with email:", emailAdd);
      const query = `SELECT userID, firstName, lastName, gender, userDOB, emailAdd, userPass, userRole FROM Users WHERE emailAdd = ?`;
      const [rows] = await db.query(query, [emailAdd]);

      console.log("User found:", rows[0]);
      return rows[0];
    } catch (error) {
      throw error; 
    }
  }

  static async findUserByID(userID){
     try {
      const query = `SELECT userID, firstName, lastName, gender, userDOB, emailAdd, userPass, userRole, profileUrl FROM Users WHERE userID = ?`;
      const [rows] = await db.query(query, [userID]);

      console.log("User found:", rows[0]);
      return rows[0];
    } catch (error) {
      throw error; 
    }
  }
}

module.exports = User