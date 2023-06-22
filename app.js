//jshint esversion:6

const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const PORT=process.env.PORT || 3000;
var items=["Buy Food", "Cook Food", "Eat Food"];
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/",  function(req, res){
    var today=new Date();
    var options={
        weekday:'long', day:"numeric", month:"long"
    };
    var day=today.toLocaleDateString("en-US", options);
    res.render("list", {DAY:day, newListItems:items});
});

app.post("/", function(req, res){
    // console.log(req.body.newItem);
    var item=req.body.newItem;
    items.push(item);

    // res.render("list", {newListItem:req.body.newItem});
    res.redirect("/");
});


app.listen(PORT, function(){
    console.log(`App listening to ${PORT}`);
});