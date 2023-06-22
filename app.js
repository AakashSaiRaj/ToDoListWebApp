//jshint esversion:6

const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const PORT=process.env.PORT || 3000;
const date=require(__dirname+'/date.js')

var items=["Buy Food", "Cook Food", "Eat Food"];
var work=[];
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/",  function(req, res){
    
    res.render("list", {listTitle:date.getDate(), newListItems:items});
});

app.post("/", function(req, res){
    // console.log(req.body.newItem);
    var item=req.body.newItem;
    
    if(req.body.button==="Work"){
        work.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

    // res.render("list", {newListItem:req.body.newItem});
    
});

app.get("/work", function(req, res){
    res.render("list", {listTitle:"Work", newListItems:work});
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(PORT, function(){
    console.log(`App listening to ${PORT}`);
});