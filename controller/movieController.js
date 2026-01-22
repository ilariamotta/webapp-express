import connection from "../database/db_connections.js"

function index(req, res, next) {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const itemsPerPage = 3;
  const offset = (page - 1) * itemsPerPage;

  const query = `
    SELECT movies.*, COALESCE(ROUND(AVG(reviews.vote), 1), 0) AS avg_vote
    FROM movies
    LEFT JOIN reviews ON movies.id = reviews.movie_id
    GROUP BY movies.id
    ORDER BY movies.id DESC
    LIMIT ? OFFSET ?
  `;

  connection.query(query, [itemsPerPage, offset], (err, result) => {
    if (err) return next(err);

    const queryNumeroFilm = "SELECT COUNT(id) AS total FROM movies";

    connection.query(queryNumeroFilm, (err, resultTotale) => {
      if (err) return next(err);

      const totalMovies = resultTotale[0].total;

      return res.json({
        info: {
          total: totalMovies,
          pages: Math.ceil(totalMovies / itemsPerPage),
          page,
        },
        results: result,
      });
    });
  });
}







function show(req, res, next) {
const slug = req.params.slug;
const query = `
    SELECT movies.*, COALESCE(ROUND(AVG(reviews.vote), 1), 0) AS avg_vote
    FROM movies
    LEFT JOIN reviews 
    ON movies.id = reviews.movie_id
    WHERE movies.slug = ?
    GROUP BY movies.id
    LIMIT 1`

connection.query(query, [slug], (err, results) => { 
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

    connection.query(reviewsQuery, [movie.id], (err, reviewsResult) => {
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