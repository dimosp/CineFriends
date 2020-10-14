const express = require("express");
const app = express();

// import mongoose for MongoDB object modeling
const mongoose = require("mongoose");
// load env variables and create .env.example file
const dotenv_safe = require("dotenv-safe");
dotenv_safe.config();

// connecting to MongoDB
mongoose.connect(
    process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log("Connected to MongoDB!"));

// if error occures, show error message
mongoose.connection.on("error", err => {
    console.log(`MongoDB connection error: ${err.message}!!!`)
});

// bring the routes
const testRoutes = require("./routes/test");

// middleware
app.use("/api", testRoutes);

// listening on environment port if defined or 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Node JS API is listening on port: ${port}`);
});