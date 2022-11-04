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
    res.render("layout_green_spaces");
});

router.get("/renew_energy_installations", function(req,res){
    res.render("layout_renew_energy_install");
});

router.get("/pollution", function(req,res){
    res.render("ghg_emission");
});

module.exports = router;