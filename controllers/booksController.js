const siteData = require('../data/siteData')
const bookInventory = require('../data/bookInventory');

const Book = require("../models/bookModel");

const bookSample = async (request, response, next) => {

  const sampleModel = new Book({
    title: "Flying Through Front End Frontiers",
    author: "Mario Muskrat",
    price: 12,
    starRating: 4.7,
    synopsis: "Have you ever wanted to create a plane with CSS? Curious about more advanced JavaScript? Look no further!",
  });
  
  //the sampleModel matches the bookSchema in the Model folder
  console.log(sampleModel, "Sample");
  sampleModel.save(); //save the data 

  try {
    if (response.ok) { //remember if we get a 200 response = OK
      await response.status(200).json({
        success: { message: "This route points to the Books sample" },
        data: sampleModel,
      });
    }
  } catch (error) {
    response.status(400).json({
      error: { message: "Resource not found. Search again." },
    });
  }
};

const getAllBooks = async (request, response, next) => {
  //create a simpler iterator that stores the bookInventory
  const books = bookInventory;

  //Use a try-catch statement to test routing. Return the response.
  try {

    const books = await Book.find({});
    const sort = await Book.find({}).sort({title: 1});

    return response.status(200).json({
      success: { message: "This route points to the Books page with all of the books" },
      data: {books}, siteData
    })
  } catch (error) {
    return response.status(400).json({
      error: { message: "Resource not found. Search again." },
    })
  }
};

const getBook = async (request, response, next) => {
  const { _id } = request.params; // store the request.params object in variable, get the id from params

  //Use a try-catch statement to test routing. Return the response.
  try {
    //create a simpler iterator that stores the foundBook, ex. (one) book after finding the matching _id value
    const book = bookInventory.find(bookInventory => bookInventory._id === _id);
    return response.status(200).json({
      success: { message: "Book found" },
      data: { book },
    });
  } catch (error) {
    return response.status(400).json({
      error: { message: "There is an error when retrieving a book" },
    });
  }
};

const createBook = async (request, response, next) => {
    const {title, author, price, starRating, synopsis,} = request.body;
  
  const newBook = {
    title,
    author,
    price,
    starRating,
    synopsis,
  };

  try {
    bookInventory.push(newBook)
    
    return response.status(201).json({
      success: { message: "A new book is created." },
      data: { newBook },
    });
    
  } catch (error) {
    return response.status(400).json({
      error: { message: "There is an error when creating a book." },
    });
  }
};

const updateBook = async (request, response, next) => {
  const { _id } = request.params;
  const { title, author, price, starRating, synopsis } = request.body; 

  try {
    const updatedBook = {
      title,
      author,
      price,
      starRating,
      synopsis,
    };

    const foundBookIndex = books.find((book) => book._id === _id);
    books[foundBookIndex] = newBook; //Value transfer between the correct index and the information passed through the newBook

    return response.status(201).json({
      success: { message: "The book is updated" },
      data: { updatedBook },
    });
  } catch (error) {
    return response.status(400).json({
      error: { message: "There is an error when updating a book" },
    });
  }
};

const deleteBook = async (request, response, next) => {
  const { _id } = request.params;

  try {
    const eraser = books.filter((book) => book._id !== _id);
    console.log(eraser)
    
    return response.status(200).json({
      success: { message: "Book deleted" },
    });
  } catch (error) {
    return response.status(400).json({
      error: { message: "There is an error when deleting a book" },
    });
  }
};
module.exports = { getAllBooks, getBook,createBook, updateBook, deleteBook, bookSample };
