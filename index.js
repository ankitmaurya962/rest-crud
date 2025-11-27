const express = require("express")
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");  //unique id
var methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

app.set("view engine" ,"ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Aman",
        content: "Sab bhagwan ki kripa hai",
    },
    {
        id: uuidv4(),
        username: "Jay",
        content: "Randi Rona",
    },
    {
        id: uuidv4(),
        username: "Ankit",
        content: "My portfolio reached 150000",
    }
]
//view all posts
app.get("/posts", (req,res)=>{
    res.render("index", {posts});
})
//creating new post
app.get("/posts/new", (req, res)=>{
    res.render("new");
})
app.post("/posts", (req, res)=>{  //recieving post request from form
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
})
//show individual post
app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find(e=> e.id == id);
    res.render("show", {post});
})


//update post
app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find(e=> e.id == id);
    res.render("edit", {post});
})

app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let updatedData = req.body.content;
    let post = posts.find(e=> e.id == id);
    post.content = updatedData;
    res.redirect("/posts");
});
//delete
app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter(e => e.id!=id);
    res.redirect("/posts");
})

app.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
});

