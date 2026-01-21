import connection from "../database/db_connections.js"

function index(req, res, next) {
const query = `SELECT movies.*, CAST(AVG(reviews.vote) AS FLOAT) as avg_vote
FROM movies
LEFT JOIN reviews
ON movies.id = reviews.movie_id
GROUP BY movies.id`;

connection.query(query, (err, result)=>{
    if (err) return next(err);
    return res.json ({
        results: result,
    })
})
}


function show(req, res, next) {
const id = req.params.id
const query = "SELECT * FROM `movies` WHERE `id` = ?";

connection.query(query, [id], (err, results) => { 
    if (err) return next(err);

    if(results.length === 0) {
        res.status(404);
        return res.json({
            error: "Not found",
            message: "Film non trovato",
        })
    }

    const movie = results[0];

    const reviewsQuery = "SELECT * FROM `reviews` WHERE `movie_id` = ?";

    connection.query(reviewsQuery, [id], (err, reviewsResult) => {
        if (err) return next(err);

        res.status(200);
        res.json({
            ...movie,
            reviews: reviewsResult,
        })
    })
})
}

export default {index, show}