const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/wikiDB', {useNewUrlParser: true});

const articleSchema = {
    name: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", async (req, res) => {
    await Article.find().then(foundArticles => {
        res.send(foundArticles);
    }).catch(err => {
        console.log(err);
    })
});

app.post("/articles", function(req, res){
    console.log(req.query.title);
    console.log(req.query.content);
});




app.listen(2048, function() {
    console.log("Server started on port 2048");
  });