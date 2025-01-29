const express = require("express");
const movieRouter = require("./routers/movies")
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors")

const app = express();
const port = process.env.SERVER_PORT;

//cors
app.use(cors({
    origin:"http://localhost:5173"
}))

// Middleware per rendere la cartella pubblica accessibile da fuori
app.use(express.static('public'));

// Middleware che fa il parse di json
app.use(express.json());

//gruppi di rotte
app.use("/movies" , movieRouter)

//controlla l'errore
app.use(errorHandler);

app.listen(port , () =>{
    console.log("server online");

})