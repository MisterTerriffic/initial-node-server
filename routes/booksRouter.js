const express = require("express");
const router = express.Router();

const { getAllBooks, getBook, createBook, updateBook, deleteBook, bookSample } = require("../controllers/booksController");

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



//All routes start with "/api/books/"
router.get("/", getAllBooks);

router.get("/:_id", getBook);

router.post("/create/new", createBook);

router.put("/update/:_id", updateBook);

router.delete("/delete/:_id", deleteBook);

router.get("/sample", bookSample);

module.exports = router;
