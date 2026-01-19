export default function errorHandler(err, req, res, next){
    res.status(500);
    return res.json({
        error: process.env.ENVIROMENT === "development" ? err : "INTERNAL_ERRROR",
        message: "Errore interno al server"
    })
}