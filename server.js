const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const routes = require("./routes/routes");
const app = express();
const mongoose = require("mongoose");
const seeds = require("./scripts/bandSeeds.js");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add routes, both API and view
// app.use("/",routes);

// app.use(express.static("client/build"));

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/bandapp",
  {
    useMongoClient: true
  }
);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  if(process.env.NODE_ENV === "production"){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  }else{
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  }
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
