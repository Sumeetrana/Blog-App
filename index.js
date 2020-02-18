const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();

const Blog = require("./model/blogModel");

mongoose.connect("mongodb://localhost/blogApp", (err) => {
    if(err) console.log(err);
    else {
        console.log("DB connected..");
        
    }
})

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render("blogs", {blogs: blogs})
        }
    })
})

app.post("/", (req, res) => {
    var newBlog = new Blog();
    newBlog.title = req.body.title;
    newBlog.imageUrl = req.body.image;
    newBlog.content = req.body.content;
    newBlog.save((err, data) => {
        if (err) {
            console.log(err);
            
        } else {
            res.redirect("/");
        }
    })
        
})

app.get("/new", (req, res) => {
    res.render("new");
})

app.get("/:id", (req ,res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {blog: blog})
        }
    })
})

app.get("/:id/edit", (req ,res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (!err) {
            res.render("edit", {blog: foundBlog})
        }
    })
})

app.post("/:id", (req ,res) => {
    // res.render("show")
    Blog.findByIdAndUpdate(req.params.id, req.body, {new:true},  (err, foundBlog) => {
        if (!err) {
            res.redirect(`/${req.params.id}`)
        }
    })
})

app.post("/:id/delete", (req ,res) => {
    Blog.findByIdAndDelete(req.params.id, (err, data) => {
        if (!err) {
            res.redirect("/");
        }
    })
})

app.listen(3000, () => {
    console.log("Server started...");
    
})