import express from 'express'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.json())
const articlesInfo = {
    'smirks': {
        upvotes: 0,
        comments: [],
    }
}

app.post('/api/articles/:name/upvote', function (req, res) {
    const articleName = req.params.name;
    articlesInfo[articleName].upvotes += 1;
    res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes}`)
})
app.post()
app.listen(8000, () => console.log('listening on 8000'))