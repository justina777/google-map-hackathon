var express = require("express");

var router = express.Router();

router.get("/", function(req,res){
    res.render("index");
});

router.get("/animation", function(req,res){
    res.render("animation");
});

router.get("/night_mode", function(req,res){
    res.render("night_map");
});

router.get("/green_spaces", function(req,res){
    res.render("data_feed");
});

module.exports = router;