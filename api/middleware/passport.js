const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../model/User')

passport.use(new LocalStrategy({ usernameField: "emailAdd", passwordField: "userPass" },

    async (emailAdd, userPass, done) => {
      try {
        const user = await User.findUserByEmail(emailAdd);

        if (!user) {
          return done(null, false, { msg: "Incorrect email address" });
        }

        const passwordMatch = await bcrypt.compare(userPass, user.userPass);

        if (!passwordMatch) {
          return done(null, false, { msg: "Incorrect Password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.userID);
});

passport.deserializeUser(async (userID, done) => {
  try {
    const user = await User.findUserByID(userID);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport