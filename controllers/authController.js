const userRoster = require("../data/userInventory");
const User = require("../models/userModel");


const register =  (request, response, next) => {
    //firstName lastName username password - request.body
        const {firstName, lastName, username, password} = request.body;
        console.log(request.body)

        if(error){
            return next(error);
        }else if (!firstName || !lastName || !username || !password){

        }
    
    try{
        const newUser = {
            firstName,
            lastName,
            username,
            password,
        };
    
        userRoster.push(newUser);

        newUser.save();
    
        newUser.password = undefined;

        console.log("userRoster:>>", userRoster);

        response.status(201).json({
            success: {message: "User Account is created."},
            data: {newUser},
            statuscode: 201,
        })

    } catch (error) {
        console.log(error);
    
        response.status(400).json({
            error: {message: "User information not entered properly."},
        });
    }
    };

    const login = (request, response, next) => {
        //Steps: get information and confirm
        
            response.status(200).json({
                success: {message: "Login was successful"},
            });
        };
        
        const localLogin = async (response, request, next) => {
            const user = userRoster[userRoster.length - 1];
        
            // const userCopy = user;
            let result =true;
        
            const userCopy = {...request.user._doc};
            userCopy.password = undefined;
            function mockPassport(error, user) {
                if(error){
                    return next(error);
                }
            }
        
            mockPassport();
        
            response.status(200).json ({
                success: {message: "Login Successful"},
                data: {user, userCopy},
                result,
            });
        };
        
        router.get("/login/error", (response, request, next) => {
            response.json("Login Error.");
        });

    const logout = (request, response, next) => {
        console.log("Intializing logout controller logic");

         console.log("Session destroyed");
        response.clearCookie("connect.sid");
    
        function sessionDestruction(error) {
            if(error){
                return next(error);
            }
        }
        sessionDestruction();
    
        response.status(200).json ({
            success: {message: "Logout Completed."},
        });
    };

module.exports = {register, login, localLogin, logout};