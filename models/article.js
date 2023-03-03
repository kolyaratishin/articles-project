const mongoose = require("mongoose").default;

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;