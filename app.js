import express from "express";
import cors from "cors";
import moviesRouter from "./routers/movies.js"
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/routeNotFound.js";



const app = express();
const port = process.env.SERVER_PORT;

app.use(express.static("public"));
app.use(express.json())

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
}))


app.use("/api/movies", moviesRouter) 


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
console.log(`Il server è in ascolto sulla porta ${port}`)
});

