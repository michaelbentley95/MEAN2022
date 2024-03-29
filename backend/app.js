const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

const api = process.env.API_URL;
const productsRouter = require("./routers/products");

//Middleware
app.use(express.json());
app.use(morgan("tiny"));

//Routers
app.use(`${api}/products`, productsRouter);

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("Connected to MongoDB...");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(3000, () => {
    console.log(api);
    console.log("server is running http://localhost:3000");
});
