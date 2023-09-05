const passport = require("../middleware/passport");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const { createToken } = require('../middleware/AuthenicateUser')

module.exports = {
    async register(req, res) {
        const {
            firstName,
            lastName,
            gender,
            userDOB,
            emailAdd,
            userPass,
            userRole,
        } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(userPass, 10)

            const user = {
              firstName,
              lastName,
              gender,
              userDOB,
              emailAdd,
              userPass: hashedPassword,
              userRole,
            };

            await User.createUser(user)

            const token = createToken(user)

            res.json({
                status: res.statusCode,
                token,
                msg: 'User has been registered'
            })
        } catch (error) {
            console.log(error);
            res
              .status(500)
              .json({ msg: "An error occurred while registering the user" });
        }
    },

    async fetchUsers(req, res){
        try {
            const users = await User.fetchUsers()

            return res.json({
              status: res.statusCode,
              users,
            });
        } catch (error) {
            
        }
    },

    async login(req, res, next){
        passport.authenticate('local', (err, user, info) =>{
            if(err){
                return next(err)
            }
            if(!user){
                return res.status(400).json({ msg: info.message });
            }
            req.logIn(user, (loginErr) =>{
                if(loginErr){
                    return next(loginErr)
                }
                const token = createToken(user);
                return res.json({ 
                    token,
                    msg: "Login successful" 
                });
            })
        })(req, res, next)
    },

    async logout(req, res){
        res.cookie("jwtToken", '');
        res.json({ msg: "Logged out successfully" });
    }    
};
