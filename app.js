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


app.route("/articles")

.get(async (req, res) => {
    await Article.find().then(foundArticles => {
        res.send(foundArticles);
    }).catch(err => {
        console.log(err);
    })
})

.post(function(req, res){
    
    const newArticle = new Article ({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save().catch(err => {
        res.send(err)
    });
})

.delete(function(req ,res){

    Article.deleteMany({}).then(function (){
          res.send("successfully deleted all articles");
      }) .catch(err =>{
        res.send(err);
})});

////// Requests targeting specific article //////

app.route("articles/:articleTitle")

.get(function(req,res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        if (foundArticle) {
            res.send(foundArticle);
        } else {
            res.send("No articles matching that title was found.")
        }
    });
})

.put(function(req, res){
    Article.update(
        {title: req.params.articleTitle}, 
        {title: req.body.title, content: req.body.content},
        function(err){
            if(!err){
                res.send("Successfully updated article!")
            }
        }
    )
})
  

app.listen(2048, function() {
    console.log("Server started on port 2048");
  });