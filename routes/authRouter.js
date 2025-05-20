const express = require("express");

const {
    register,
    login,
    loginLocal,
    logout,
} = require("../controllers/authController");

const router = express.Router();

const checkAuthenticator = (require, respone, next) => {

    if(respone.ok) {
        return next();
    } else {
        return respone
        .json("Warning user is not an admin")
        .redirect(403, "/authenticated");
    }
};

router.get("/authenticator", (request, response, next) => {
    response.redirect("/");
})

router.get("/admin", checkAuthenticator, (request, response, next) => {
    loginLocal.call(response.result)
        function auth() {
            response.json("Redirecting to admin page")
        }

        auth();
    })

//register - POST
router.post("/register", register);
//login - GET
router.get("/login", login);

router.get("/login/local", loginLocal);
//logout - GET
router.get("/logout", logout);

module.exports = router;