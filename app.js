const express = require("express");
const movieRouter = require("./routers/movies")

const app = express();
const port = process.env.SERVER_PORT;

// Middleware per rendere la cartella pubblica accessibile da fuori
app.use(express.static('public'));


//gruppi di rotte
app.use("/movies" , movieRouter)


app.listen(port , () =>{
    console.log("server online");

})