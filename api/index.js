const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const prodRoutes = require("./routes/prodRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require('cookie-parser')

const app = express();

// Middleware
app.use(
  express.json(),
  session({ secret: "secret_key_test", resave: true, saveUninitialized: true }),
  passport.initialize(),
  passport.session(),
  cookieParser()
);

// Routes
app.use('/auth', authRoutes)
app.use("/", prodRoutes);
app.use("/", userRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`);
})