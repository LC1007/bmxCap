const { sign, verify } = require("jsonwebtoken");

function createToken(user) {
  const token = sign({ emailAdd: user.emailAdd }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
}

const verifyToken = (req, res, next) =>{
    const token = req.cookies.jwtToken;

    if(token){
        verify(token, process.env.SECRET_KEY, (err, decodedToken) =>{
            if(err){
                console.log(err.message);
            } else{
                console.log(decodedToken);
                next()
            }
        })  
    } else{
        res.json({
            msg: 'You need to login to visit /products'
        })
    }
}


module.exports = {
    createToken,
    verifyToken
}