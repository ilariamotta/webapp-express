import express from "express";
import moviesRouter from "./routers/movies.js"
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/routeNotFound.js";


const app = express();
const port = process.env.SERVER_PORT;


app.use("/api/movies", moviesRouter) 

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
console.log(`Il server è in ascolto sulla porta ${port}`)
});

