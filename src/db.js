const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");


const Note = new mongoose.Schema({
    email: String,
    note: String,
});

const Article = new mongoose.Schema({
    Slug: String,
    comments: [],
});
// "Register" the schema so that mongoose knows about it
mongoose.model("Article", Article);
mongoose.model("Note", Note);


// is the environment variable, NODE_ENV, set to PRODUCTION?
let dbconf;
if (process.env.NODE_ENV === "PRODUCTION") {
    // if we're in PRODUCTION mode, then read the configration from a file
    // use blocking file io to do this...
    const fs = require("fs");
    const fn = "config.json";
    const data = fs.readFileSync(fn);

    // our configuration file will be in json, so parse it and set the
    // conenction string appropriately!
    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
    // if we're not in PRODUCTION mode, then use
    dbconf = "mongodb://localhost/laudebugs";
}
mongoose.connect(dbconf, { useNewUrlParser: true, useUnifiedTopology: true });
