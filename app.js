import express from "express";

const app = express();
const port = process.env.SERVER_PORT;

app.listen(() => {
console.log(`Il server è in ascolto sulla porta ${port}`)
});

