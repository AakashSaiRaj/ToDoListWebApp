//jshint esversion:6

const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const PORT=process.env.PORT || 3000;
const date=require(__dirname+'/date.js')


const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost/todolistDB", ()=>{
    console.log("DB connected");
}, e=>console.error(e));

const itemSchema=new mongoose.Schema({
    item:String
});

const Item=mongoose.model("Item", itemSchema); 

// run();
// async function run(){
//     try{
//         const item=await Item.create({
//             item:"buy coconuts"
//         }); 
//         console.log(item);

//     }catch(err){
//         console.log(err.message);
//     }
// }



// run();
async function run(){
    try{
        // const item=await Item.create({
        //     item:"buy coconuts"
        // }); 
        await Item.insertMany([{item:'do home work'},{item:'visit clinic'},{item:'watch show'}]);
        console.log("Successfully added");

    }catch(err){
        console.log(err.message);
    }
}

//inserting items to list
async function addItem(x){
    try{
        await Item.create({item:x});
        console.log("Successfully added new item");
    }catch(err){
        console.log(err.message);
    }
}

// deleteItem();
async function deleteItem(x){
    try{
        await Item.deleteOne({_id:x});
        console.log("Deleted successfully");

    }catch(err){
        console.log(err.message);
    }
}



var items=["Buy Food", "Cook Food", "Eat Food"];
var work=[];
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/",  function(req, res){
    Item.find({}, function(err, foundItems){
        if(foundItems.length===0){
            run(); // check the above code. Its function for adding initial three items.
            res.render("list", {listTitle:date.getDate(), newListItems:foundItems});
        }else{
            res.render("list", {listTitle:date.getDate(), newListItems:foundItems});
        }
    });


    // Item.find({}, function(err, foundItems){
        // console.log(foundItems[0]);
        
    // });
    
    
});

app.post("/", function(req, res){
    // console.log(req.body.newItem);
    var item=req.body.newItem;
    
    if(req.body.button==="Work"){
        work.push(item);
        res.redirect("/work");
    }else{
        addItem(item);
        // inserting new item to list database
        res.redirect("/");
    }
    // res.render("list", {newListItem:req.body.newItem});
});

app.post("/delete", function(req, res){
    // console.log(req.body);
    deleteItem(req.body.checkBos);
    res.redirect("/");
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