import connection from "../database/db_connections.js"

function index(req, res) {
res.json("index movies")
}


function show(req, res) {
res.json("index movies")
}

export default {index, show}