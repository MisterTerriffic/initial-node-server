//Start coding here:
const siteData = require("../data/siteData");
const authorInventory = require("../data/authorInventory");

const getAllAuthors = async (request, response, next) => {
  //create a simpler iterator that stores the bookInventory
  const authors = authorInventory;

  //Use a try-catch statement to test routing. Return the response.
  try {
    return response.status(200).json({
      success: {
        message:
          "This route points to the Authors page with all of the authors",
      },
      data: { authors },
      siteData, //include the site data
    });
  } catch (error) {
    return response.status(400).json({
      error: { message: "Resource not found. Search again." },
    });
  }
};

const getAuthor = async (request, response, next) => {
  const { _id } = request.params; // store the request.params object in variable, get the id from params

  //Use a try-catch statement to test routing. Return the response.
  try {
    //create a simpler iterator
    const author = authorInventory.find(
      (authorInventory) => authorInventory._id === _id
    );
    return response.status(200).json({
      success: { message: "Author found" },
      data: { author },
    });
  } catch (error) {
    return response.status(400).json({
      error: { message: "There is an error when retrieving an author" },
    });
  }
};

const createAuthor = async (request, response, next) => {
  const { firstName, lastName, birthYear, bio } = request.body;

  const newAuthor = {
    firstName,
    lastName,
    birthYear,
    bio,
  };

  try {
    authorInventory.push(newAuthor);

    return response.status(201).json({
      success: { message: "A new author is created" },
      data: { newAuthor },
    });
  } catch (error) {
    return response.status(400).json({
      error: { message: "There is an error when creating an author" },
    });
  }
};

const updateAuthor = async (request, response, next) => {
  const { _id } = request.params;
  const { firstName, lastName, birthYear, bio } = request.body;

  try {
    const updatedAuthor = {
      firstName,
      lastName,
      birthYear,
      bio,
    };

    const foundAuthorIndex = authors.find((author) => author._id === _id);
    authors[foundAuthorIndex] = newAuthor; //Value transfer between the correct index and the information passed through the newAuthor

    return response.status(201).json({
      success: { message: "The author is updated" },
      data: { updatedAuthor },
    });
  } catch (error) {
    return response.status(400).json({
      error: { message: "There is an error when updating an author" },
    });
  }
};

const deleteAuthor = async (request, response, next) => {
  const { _id } = request.params;

  try {
    const eraser = authors.filter((author) => author._id !== _id);
    console.log(eraser);

    return response.status(200).json({
      success: { message: "Author deleted" },
    });
  } catch (error) {
    return response.status(400).json({
      error: { message: "There is an error when deleting an author" },
    });
  }
};

module.exports = {
  getAllAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
