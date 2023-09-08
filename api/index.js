const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const prodRoutes = require("./routes/prodRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();

// Middleware
app.use(
  express.json(),
  session({ secret: "secret_key_test", resave: true, saveUninitialized: true }),
  passport.initialize(),
  passport.session(),
  cookieParser(),
  cors()
);

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Request-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});

// Routes
app.use('/', authRoutes)
app.use("/", prodRoutes);
app.use("/", userRoutes);
app.use("/", orderRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`);
})