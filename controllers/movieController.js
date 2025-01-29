const connection = require("../data/dbConnection")
const errorHandler = require("../middleware/errorHandler")

//index
const index = (req, res, next) => {

    const sql = "SELECT * FROM movies";

    connection.query(sql, (err, movies) => {
        if (err) {
            return next(new Error(err.message))
        }
        else {
            return res.status(200).json({
                status: "success",
                data: movies,
            });
        }
    });
};

const show = (req, res, next) => {
    const id = req.params.id;

    const sql = "SELECT * FROM movies WHERE id = ?";
    const sqlReviews = `
    SELECT reviews.* 
    FROM reviews
    JOIN movies
    ON movies.id = reviews.movie_id
    WHERE movies.id = ?
  `;


    connection.query(sql, [id], (err, movies) => {
        if (err) {
            return next(new Error(err.message))

        } else if (movies.length === 0) {
            return res.status(404).json({
                message: "Film non trovato",
            })
        }
        else {

            connection.query(sqlReviews, [id], (err, reviews) => {
                if (err) {
                    return next(new Error(err.message));

                } else {
                    return res.status(200).json({
                        status: "success",
                        data: {
                            ...movies[0],
                            reviews
                        },
                    });
                }
            });
        }
    });
}


const storeReview = (req, res, next) => {
    const movieId = req.params.id;
    const { name, vote, text } = req.body;
    console.log("salvo libro", movieId);
    console.log(name, vote, text);

    //controllo che il film esiste
    const movieSql = "SELECT * FROM movies WHERE id = ?";

    connection.query(movieSql, [movieId], (err, result) => {
        if (err) {
            return next(new Error(err.message))
        }
        if(result.length === 0) {
            return res.status(404).json({
                status: "fail",
                data: "film non trovato",
            });
        }
    });



    // Se è andato tutto bene e il film esiste, possiamo aggiungere la recensione
    const sql = `
    INSERT INTO reviews(movie_id, name, vote, text)
    VALUES (?, ?, ?, ?);
     `;

    connection.query(sql, [movieId, name, vote, text], (err, result) => {

        if (err) {
            return next(new Error("query fallita"));
        }

        res.status(201).json({
            status: "success",
            message: "recensione aggiunta",
        });
    });

}


const storeMovie = (req,res,next) =>{

    const imageName = req.file.name
    const {title, director, genre, release_year, abstract} = req.body;
    

     const newMovieSql = `
     INSERT INTO movies( title, director, genre, release_year, abstract, image)
     VALUES (?, ?, ?, ?, ? ,?);
      `;

      connection.query(newMovieSql, [title, director, genre, release_year, abstract, imageName], (err,result) =>{
         if(err) {
             next(new Error(err.message));
           }
      
           return res.status(201).json({
             status: "success",
             message: "Il film è stato salvato",
           });
        
      })

}


module.exports = {
    index,
    show,
    storeReview,
    storeMovie,
};