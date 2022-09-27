var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
    res.render("index");
});

router.get("/animation", function(req,res){
    res.render("animation");
});

module.exports = router;