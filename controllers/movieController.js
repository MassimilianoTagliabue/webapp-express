const connection = require("../data/dbConnection")

//index
const index = (req, res, next) => {

    const sql = "SELECT * FROM movies";

    connection.query(sql, (err, movies) => {
        if (err) {
            return res.status(500).json({
                message: "Errore interno del server",
            });
        } else {
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
            return res.status(500).json({
                message: "Errore interno del server",
            });
        } else if (movies.length === 0) {
            return res.status(404).json({
                message: "Film non trovato",
            })
        }
        else {
            connection.query(sqlReviews, [id], (err, reviews) => {
                if (err) {
                    return res.status(500).json({
                        message: "Errore interno del server",
                    });
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

module.exports = {
    index,
    show,
};