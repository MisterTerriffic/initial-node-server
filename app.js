require("dotenv").config();
require("./config/connection");
require("./config/authStrategy");

//initialize express environment
const express = require("express");
//morgan
const morgan = require("morgan");
//4.3 P2 add the path module
const path = require("node:path");
const helmet = require("helmet"); 
//allow the app to use the express package
//-----Middleware-------
//cors
const cors = require("cors");

const session = require("express-session"); 
const passport = require("passport");

const mongoose = require("mongoose");

const app = express();

//define a port number for the server to listen for a connection. 
// const PORT = 3000;
// Yusuf: Assign a port from the .env file (This is needed for deployment later because some deployment tools we will use will create their own port and will get it from their .env file)
const PORT = process.env.PORT || 8080; 

//Define the routing variable for authorsRoutes
const booksRoutes = require('./routes/booksRouter');
const authorsRoutes = require('./routes/authorsRouter');
const authRoutes = require("./routes/authRouter");

app.use(helmet());
app.use(cors({credentials: true, origin: true}));
app.use(morgan("combined"));
//combined - show a lof that is more comprehensive
//dev - show simplier information

//------ Per 2: CW: Dunamic Node Review------
//Tell the app to use the express to bundle all of the within the public directory
app.use(express.static(path.join(__dirname, "/public")));

//Tell the aoo to use the express and JSON to read data
app.use(express.json());

//Tell the app to use express and urlencoded to scramble from information and set to true
app.use(express.urlencoded({extended: true}));
//-----end of middleware----

//---Per 3 CW: Dynamic Pass Data----
//Insert Site Data
// Site Data 
// const username = 'CodeSquader';
// const date = new Date();
// const year = date.getFullYear();
// const isSignedIn = true;


const siteData = require('./data/siteData');
app.get("/", (request, response, next) => {
  response.status(200).json({success: {message: "This route points to the Home page"}, data: siteData , statusCode: 200});
});

//initialize and retain an index route to automatically render a message when the server starts
// app.get("/", (request, response, next) => {
//     // response.send("This is the home page");//render a str on the page
//     // response.json("Hello World, This is a JSON");
//     response.status(200).json({
//         success: {message: ""},
//         statusCode: 200
//     });
// });

// app.get("/admin", (request, response, next) =>{
//     // response.send("This route points to the Admin Console Page");
//     response.status(200).json({
//         success: {message: "This route points to the Admin Console Page"},
//         statusCode: 200
//     });
// });

// app.get("/authors", (request, response, next) => {
//     // response.send("This route points to the Author page");
//     response.status(200).json({
//         success: {message: "This route points to the Author page"},
//         statusCode: 200
//     });
// });

// app.get("/books", (request, response, next) =>{
//     // response.send("This route points to the Books page");
//     response.status(200).json({
//         success: {message: "This route points to the Books page"},
//         statusCode: 200
//     });
// });

// app.get("/site-routes", (request, response, next) =>{
//     // response.send("This route points to the site router page");
//     response.status(200).json({
//         success: {message: "This route points to the site router page"},
//         statusCode: 200
//     });
// });

//Tell the app to use he routing variables you defined earlier, booksRoutes and authorsRoutes
app.use("/api/books", booksRoutes);
app.use("/api/authors", authorsRoutes);
app.use("./auth", authRoutes);

app.use(session({
 resave: false,
 saveUninitialized: false,
 secret: process.env.SECRET_KEY,

}))


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
// passport.session below will take care of creating a session on calls that require passport authentication
app.use(passport.session());

    if(condition){
        return response.status(error.status || 400).json({
            error: {message: "User already exist."},
            statusCode: error.status || 400
        })
        // console.log(error);
    }else {
        console.log("We passed the handle error Middleware. Proceed.")
    };

    response.status(error.status || 500 ).json({
        error: {message: error.message || "Internal Server Error"},
        statusCode: error.status || 500,
    });




// app.get("/", (request, response, next) => {
//     // response.send("This is the home page");//render a str on the page
//     // response.json("Hello World, This is a JSON");
//     response.status(200).json({
//         success: {message: ""},
//         statusCode: 200
//     });
// });

//have the app listen at the PORT where a console.log says `Server is listening on ${PORT}. Connection established.`
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}. Connection established.`);
    // console.log(`Carol's bookstore server is listening on port ${PORT}`);
});

// //-------Previous Classwork---------
// //------4.2 P2-------

// //Create 4 NEW GET routes that send a request, receive a response, and move to the next block of code w/ .status().json and a success message :
// // PATH: /books/create, HANDLER:"This route points to the Create Book page”
// // PATH: /books/:_id, HANDLER: "This route points to the specific book via the ID”
// // PATH: /authors/create, HANDLER: "This route points to the Create Author page”
// // PATH: /authors/:_id, HANDLER: "This route points to the specific author via the ID”

// app.get("/books/create", (request, response, next) =>{
//     response.status(200).json({
//         success: {message: "This route points to the Create Book Page"},
//         statusCode: 200
//     });
// });

// app.get("/books/:_id", (request, response, next) =>{
//     response.status(200).json({
//         success: {message: "This route points to the specific book via the ID"},
//         statusCode: 200
//     });
// });

// app.get("/authors/create", (request, response, next) =>{
//     response.status(200).json({
//         success: {message: "This route points to the Create Author page"},
//         statusCode: 200
//     });
// });

// app.get("/author/:_id", (request, response, next) =>{
//     response.status(200).json({
//         success: {message: "This route points to the specific author via ID"},
//         statusCode: 200
//     });
// });


// //---Per 3 CW: Dynamic Pass Data----
// //Initialize and retain an index route to automatically render a message when the server starts
// app.get("/", (request, response, next) => {
//     // response.send("This is the home page");//render a str on the page
//     // response.json("Hello World, This is a JSON");
//     response.status(200).json({
//         success: {message: ""},
//         data: {
//             username: username,
//             date: date,
//             year: year,
//         },
//         statusCode: 200
//     });
// });

// app.get("/admin", (request, response, next) =>{
//     // response.send("This route points to the Admin Console Page");
//     response.status(200).json({
//         success: {message: "This route points to the Admin Console Page"},
//         data: {
//             isSignedIn: isSignedIn,
//         },
//         statusCode: 200
//     });
// });

// app.get("/authors", (request, response, next) => {
//     // response.send("This route points to the Author page");
//     response.status(200).json({
//         success: {message: "This route points to the Author page"},
//         statusCode: 200
//     });
// });

// app.get("/books", (request, response, next) =>{
//     // response.send("This route points to the Books page");
//     response.status(200).json({
//         success: {message: "This route points to the Books page"},
//         //include the proper array of data that is needed to be passed in a key of data and a value of an object that has the array as the parameter.
//         data: {
//             books:books
//         },
//         statusCode: 200
//     });
// });

// app.get("/site-routes", (request, response, next) =>{
//     // response.send("This route points to the site router page");
//     response.status(200).json({
//         success: {message: "This route points to the site router page"},
//         statusCode: 200
//     });
// });


// app.get("/books/create", (request, response, next) =>{
//     response.status(200).json({
//         success: {message: "This route points to the Create Book Page"},
//         statusCode: 200
//     });
// });

// app.get("/books/:_id", (request, response, next) =>{
//     const params = request.params; //store the request.params object in a variable
//     console.log(params);
//     const {_id} = params;//Retieve the _id from the parameters object destructing
//     //Create a new variable called foundBook and use the .find method on books array to find the book with the given _id.
//     const foundBook = books.find((book) => book._id === _id);
//     //Stage an if...else statement to detect if there is a book found.  If the book is found, log the key of data and a value of an object 
//     // that has the foundBook as the parameter after the success message.
//     if(foundBook){
//          response.status(200).json({
//             success: {message: "This route points to the specific book via the ID"},
//             data: {
//                 book: foundBook
//             },
//             statusCode: 200
//         });
//     }else {
//         //Otherwise, send a 404 error with the message of "There is no book with this id", with the corresponding statusCode.
//         response.status(404).json({
//             error: {message: "Book not found."},
//             statusCode: 404
//         })
//     }
// });

// app.get("/authors/create", (request, response, next) =>{
//     response.status(200).json({
//         success: {message: "This route points to the Create Author page"},
//         statusCode: 200
//     });
// });

// app.get("/author/:_id", (request, response, next) =>{
//     response.status(200).json({
//         success: {message: "This route points to the specific author via ID"},
//         statusCode: 200
//     });
// });