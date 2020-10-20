const express = require("express");
const app = express();
const morgan = require("morgan");
const expressValidator = require("express-validator");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi3.json");

// in order to parse incoming request bodies with req.body property
const bodyParser = require("body-parser");

// parse Cookie header and populate req.cookies with an object keyed by the cookie names
const cookieParser = require('cookie-parser');

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
const authRoutes = require("./routes/auth");

// middleware

// HTTP request logger, output colored by response status
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/api", testRoutes);
app.use("/api", authRoutes);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// handle unauthorized error
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorized action!"});
    }
});

// listening on environment port if defined or 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Node JS API is listening on port: ${port}`);
});