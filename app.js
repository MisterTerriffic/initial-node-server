require("dotenv").config(); 
require("./config/connection"); 
require("./config/authStrategy"); 
const express = require("express");
const morgan = require("morgan");
const path = require("node:path");
const helmet = require("helmet"); 
const cors = require("cors");


const session = require("express-session");
const passport = require("passport");

const booksRoutes = require('./routes/booksRouter');
const authorsRoutes = require('./routes/authorsRouter');
const authRoutes = require('./routes/authRouter');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet()); 
app.use(morgan("dev")); 
app.use(cors({ credentials: true, origin: true })); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")));


app.use(
  session({
    resave: false,
    saveUninitialized: false, 
    secret: process.env.SECRET_KEY,


    cookie: {
      httpOnly: true, 
      secure: false, 
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/books", booksRoutes);
app.use("/api/authors", authorsRoutes);
app.use("/auth", authRoutes); 

app.use((err, req, res, next) => {
  const authErrStatus = err.status || 400;
  const serverErrStatus = err.status || 500;
  if (err.code === 11000) {
    return res.status(authErrStatus).json({
      error: { message: "Already have an account? Try logging in." },
      statusCode: authErrStatus,
    });
  }

  return res.status(serverErrStatus).json({
    error: { message: err.message || "Internal server error." },
    statusCode: serverErrStatus,
  });
});


const siteData = require('./data/siteData');
app.get("/", (request, response, next) => {
  response.status(200).json({success: {message: "Index route works after deployment"}, data: siteData, statusCode: 200}); 
});

app.listen(PORT, () => {
  console.log(`Carol's bookstore server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`)
});