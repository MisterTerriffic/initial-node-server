const mongoose = require("mongoose");
const { schema } = require("./bookModel");

const { Schema } = mongoose;

const authorSchema = new schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
     lastName: {
        type: String,
        required: true,
        trim: true,
    },
     birthYear: {
        type: Number,
        required: true,
        trim: true,
    },
    synopsis: {
        type: String,
    },
})

const author = mongoose.model("Author", authorSchema);

module.exports = author;