const userRoster = require("../data/userInventory");


const register =  (request, response, next) => {
    //firstName lastName username password - request.body
        const {firstName, lastName, username, password} = request.body;
    
    try{
        const newUser = {
            firstName,
            lastName,
            username,
            password,
        };
    
        userRoster.push(newUser);
    
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
        
        router.get("/login/local", (response, request, next) => {
            const user = userRoster[userRoster.length - 1];
        
            const userCopy = user;
            let result =true;
        
            function mockPassport(err, user) {
        
            }
        
            mockPassport(err, user);
        
            response.status(200).json ({
                success: {message: "Login Successful"},
                data: {user, userCopy},
                result,
            });
        });
        
        router.get("/login/error", (response, request, next) => {
            response.json("Login Error.");
        });

    const logout = (request, response, next) => {

        response.clearCookie("connect.sid");
    
        function sessionDestruction(err) {
            if(err){
                return next(err);
            }
        }
        sessionDestruction();
    
        response.status(200).json ({
            success: {message: "Logout Completed."},
        });
    };



module.exports = {register, login, localLogin, logout};