const express = require("express");
const app = express();

// bring the routes
const testRoutes = require("./routes/test");

// middleware
app.use("/api", testRoutes);

// listening port
const port = 8080;
app.listen(port, () => {
    console.log(`Node JS API is listening on port: ${port}`);
});