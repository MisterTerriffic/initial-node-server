const bcrypt = require("bcrpyt"); 
const passport = require("passport");

// const userRoster = require("../data/userInventory");
const User = require("../models/userModel");
const { response } = require("express");


const register = async (request, response, next) => {
  //firstName lastName username password - request.body
  const { firstName, lastName, username, password, googleId, githubId } = request.body;
  console.log(request.body);

  if (error) {
    return next(error);
  } else if (!firstName || !lastName || !username || !password) {
  }

  try {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashedPassword,
      googleId: googleId,
      githubId: githubId,
    };

    await newUser.save();

    request.login(newUser, (error) => {
      if(error){
        return next(error);
      }
    })

    userRoster.push(newUser);

    newUser.save();

    newUser.password = undefined;

    console.log("userRoster:>>", userRoster);

    response.status(201).json({
      success: { message: "User Account is created." },
      data: { newUser },
      statuscode: 201,
    });
  } catch (error) {
      return next(error);
  }
};

const login = (request, response, next) => {
  //Steps: get information and confirm

  response.status(200).json({
    success: { message: "Login was successful" },
  });
};

const localLogin = async (response, request, next) => {
  // const user = userRoster[userRoster.length - 1];
  passport.authenticate("local", (error, user, info) => {
    if(error){
      return next(error);
    };
        if (error) {
      return next(error);
    }

    if(!user){
      return response.status(401).json({
        error: { message: "There is not user detected. Try again."},
      });
    }

    request.login(user, (error) => {
      if(error){
        return next(error)
      }

  const userCopy = { ...request.user._doc };
  userCopy.password = undefined;
  console.log(userCopy);
    })

    response.status(200).json({
      success: { message: "Login Successful with local authentication. "},
       data: { user, userCopy },
    result,
    })
  });
  // const userCopy = user;
  // let result = true;

  // const userCopy = { ...request.user._doc };
  // userCopy.password = undefined;
  // function mockPassport(error, user) {
  //   if (error) {
  //     return next(error);
  //   }

  //   if(!user){
  //     return response.status(401).json({
  //       error: { message: "There is not user detected. Try again."},
  //     });
  //   }

  //   request.login(user, (error) => {
  //     if(error){
  //       return next(error)
  //     }

  // const userCopy = { ...request.user._doc };
  // userCopy.password = undefined;
  // console.log(userCopy);
  //   })

  //   response.status(200).json({
  //     success: { message: "Login Successful with local authentication. "}
  //   })
  // };

  // mockPassport();

  // response.status(200).json({
  //   success: { message: "Login Successful" },
  //   data: { user, userCopy },
  //   result,
  // });
};

const logout = async (request, response, next) => {
  console.log("Intializing logout controller logic");

  console.log("Session destroyed");
  response.clearCookie("connect.sid");

  function sessionDestruction(error) {
    if (error) {
      return next(error);
    }
  }
  sessionDestruction();

  response.status(200).json({
    success: { message: "Logout Completed." },
  });
};

module.exports = { register, login, localLogin, logout };
