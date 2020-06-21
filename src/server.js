import express from 'express'
import bodyParser from 'body-parser'

import mongoose from 'mongoose'
// const publicPath = path.resolve(__dirname, "public");

const app = express()

require('./db')
const Note = mongoose.model('Note')
const Article = mongoose.model('Article')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/laudebugs', { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if (err) {
    console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
  }
});
mongoose.set('useCreateIndex', true);

app.post('/api/articles/:name/upvote', function (req, res) {
    const articleName = req.params.name;
    articlesInfo[articleName].upvotes += 1;
    res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes}`)
})

app.post('/api/message', function(req, res){
  console.log(req.body)
    const email = req.body.email
    const message = req.body.message
    const n = new Note({
      email:email,
      note: message
    })
    n.save()
    res.send('sent')
})

app.listen(8000, () => console.log('listening on 8000'))