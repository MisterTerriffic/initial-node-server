//Start coding here: 
const express = require("express");
const router = express.Router();

const { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } = require("../controllers/authorsController");

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

//All routes start with "/api/authors/"
router.get("/", getAllAuthors);

router.get("/:_id", getAuthor);

router.post("/create/new", createAuthor);

router.put("/update/:_id", updateAuthor);

router.delete("/delete/:_id", deleteAuthor);

module.exports = router;
