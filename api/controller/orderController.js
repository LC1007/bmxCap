const Orders = require('../model/Orders')

module.exports = {
    async addOrder(req, res){
        try {
            const { userID, bmxID } = req.params
            const result = await Orders.addToCart(userID, bmxID)
            console.log("User ID:", userID, "bmxID:", bmxID);

            if(!result){
                return res.status(500).json({
                    status: 404,
                    msg: "Something went wrong trying to add product to the cart"
                })
            }

            return res.json({
                status: res.statusCode,
                result
            })

        } catch (error) {
            res
              .status(500)
              .json({ error: "An error occurred while adding product to cart" });
        }
    },

    async fetchOrders(req, res){
        const { userID } = req.params
        const [results] = await Orders.fetchOrders(userID)
        console.log(userID);

        if(!results){
            return res.status(404).json({
                status: 404,
                msg: 'No orders found'
            })
        }

        return res.json({
            status: res.statusCode,
            results
        })
    }
}