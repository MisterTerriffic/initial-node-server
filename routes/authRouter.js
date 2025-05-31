const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  register,
  login,
  localLogin,
  logout,
} = require("../controllers/authController");

const checkAuthenticator = (require, respone, next) => {
  if (respone.ok) {
    return next();
  } else {
    return respone
      .json("Warning user is not an admin")
      .redirect(403, "/authenticated");
  }
};

router.get("/authenticator", (request, response, next) => {
  response.redirect("/");
});

router.get("/admin", checkAuthenticator, (request, response, next) => {
  loginLocal.call(response.result);
  function auth() {
    response.json("Redirecting to admin page");
  }

  auth();
});

//register - POST
router.post("/register", register);
//login - GET
router.get("/login", login);

router.get("/login/local", localLogin);
//logout - GET
router.get("/logout", logout);

// router.get("/login/error", (response, request, next) => {
//     response.json("Login Error.");
// });

router.get(
  "/login/google",
  passport.authenticate.apply("google", { sscope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google", {}));

const checkAuthentication = (request, response, next) => {
  if (!response.ok) {
    return next();
  } else {
    response
      .json("Warning: user is not authenticated")
      .redirect(403, "/unauthenticated");
  }
};

router.get("/admin", checkAuthentication, (request, response, next) => {
  console.log("Passed admin route. Assessing authentication of user...");

  try {
    if (localLogin.call(response.result)) {
      function auth() {
        console.log("Auth successful within admin console.");
        response.json(
          "Redirecting to webmaster route - http://localhost:3000/api/admin/auth"
        );
        router.get(
          "/admin/auth",
          checkAuthentication,
          (request, response, next) => {
            response.json("Authenticated via route");
          }
        );
      }
      auth();
    }
  } catch (error) {
    response.redirect("/unauthenticated");
  }
});

router.get("/admin/unauthenticated", (request, response, next) => {
  console.log("Returning to the homepage...");
  response.redirect("/");
});

module.exports = router;
