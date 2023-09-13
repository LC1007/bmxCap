const { sign, verify } = require("jsonwebtoken");

function createToken(user) {
  const token = sign({ emailAdd: user.emailAdd }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
}

const verifyToken = (req, res, next) => {
  const token = req.cookies.loggedInUser;

  if (token) {
    verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.error(err);
        return res.status(401).json({
          errMsg: "Token is invalid or has expired.",
        });
      } else {
        req.decodedToken = decodedToken
        next();
      }
    });
  } else {
    res.status(401).set('Location',"/login").end()
  }
};

module.exports = {
  createToken,
  verifyToken,
};
