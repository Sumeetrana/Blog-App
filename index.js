const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();

const Blog = require("./model/blogModel");

// mongoose.connect("mongodb://localhost/blogApp", (err) => {
//     if(err) console.log(err);
//     else {
//         console.log("DB connected..");
        
//     }
// })

mongoose.connect("mongodb+srv://sumeet123:sumeet123@cluster0-saqig.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log("COnnection established");
        
    })
    .catch((err) => {
        console.log("Error:", err);
        
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

let port = 3000 || process.env.PORT;

app.listen(port, () => {
    console.log("Server started...");
    
})