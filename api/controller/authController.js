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

            const existingUser = await User.findUserByEmail(emailAdd)

            if(existingUser){
                return res.status(400).json({
                    status: 400,
                    msg: 'A user with this email already exists'
                })
            }

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

            res.status(201).json({
                status: 201,
                token,
                msg: 'User has been registered',
                user
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

            if(!users){
                return res.status(400).json({
                    status: 400,
                    msg: 'Unable to fetch users'
                })
            }

            return res.json({
              status: res.statusCode,
              users,
            });
        } catch (error) {
            console.log(error);
            res
              .status(500)
              .json({ msg: "An error occurred while trying to fetch users" });
        }
    },

    async fetchUser(req, res){
        try {
            const { userID } = req.params
            const user = await User.fetchUser(userID)
            
             if (!user) {
               return res.status(400).json({
                 status: 400,
                 msg: "Unable to fetch user",
               });
             }

            return res.json({
              status: res.statusCode,
              user
            })
        } catch (error) {
            console.log(error);
            res
              .status(500)
              .json({ msg: "An error occurred while trying to fetch user" });
        }
    },

    async updateUser(req, res){
        try {
            const { userID } = req.params
            const data = req.body
            const user = await User.updateUser(data, userID)

            return res.json({
              status: res.statusCode,
              msg: "User has been updated",
              user,
            });
        } catch (error) {
            console.error(
              "An error occurred while trying to update user:",
              error
            );
            res.status(500).json({ error: "Failed to update the user" });
        }
    },

    async deleteUser(req, res){
        try {
          const { userID } = req.params;
          const user = await User.deleteUser(userID);

          return res.json({
            status: res.statusCode,
            msg: "User has been deleted",
            user,
          });
        } catch (error) {
          console.error(
            "An error occurred while trying to delete user:",
            error
          );
          res.status(500).json({ error: "Failed to delete the user" });
        }
    },

    async login(req, res, next){
        passport.authenticate('local', (err, user, info) =>{
            if(err){
                return next(err)
            }
            if(!user){
                return res.status(400).json({ msg: info.msg });
            }
            req.logIn(user, async (loginErr) =>{
                if(loginErr){
                    return next(loginErr)
                }
                const token = createToken(user);

                const userData = await User.findUserByEmail(user.emailAdd)

                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 360000
                })

                return res.json({ 
                    token,
                    result: userData,
                    userID: userData.userID,
                    msg: "Login successful" 
                });

            })
        })(req, res, next)
    },

    async logout(req, res){
        res.cookie("jwt", '');
        res.json({ msg: "Logged out successfully" });
    }    
};
