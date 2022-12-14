var express = require("express");
var path = require("path");

var routes = require("./routes");

// env variables
require('dotenv').config();

var app = express();
app.set("port", process.env.PORT || 8080);

// static files
app.use(express.static(path.join(__dirname, "views/public")));

// console.log(path.join(__dirname, "views"))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// rounting webpages
app.use(routes);

app.listen(app.get("port"), function(){
    console.log("Server started on port "+ app.get("port"))
});