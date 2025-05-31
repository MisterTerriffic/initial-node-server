//DO NOT Touch
const mongoose = require("mongoose");

async function main() {

    try{
        await mongoose.connect(process.env.DB_URL)

        console.log("The database server is now connected");
    } catch (error){
        console.log(`Server failure, error: ${error}`); //Can use console.error() or console.log()
        next(error)
    }
}

main();