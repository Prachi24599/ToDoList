const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
// console.log(date());

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

const items = ["Study", "Meditation", "Self-Talk"];
const workItems = [];

app.get("/", function(req, res){
    let day = date.getDate(); //calling the function that is bound to date.js module
    res.render("list", {listTitle : day, newListItems : items });
});

app.post("/", function(req, res){
    // console.log(req.body);
    const item = req.body.nextItem;
    if(req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems : workItems});
});

app.post("/work", function(req, res){
    let item = req.body.nextItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function(req, res){
    res.render("about");
} );

app.listen("3000", function(){
    console.log("Server running on port 3000");
});