const Article = require("../models/article");

class ArticleController {

    static getAllArticlesPage = (req, res) => {
        Article
            .find()
            .sort({title: 1})
            .then(articles => {
                res.render("articles", {articles});
            })
    }

    static getAddArticlePage = (req, res) => {
        res.render("add-article", {header: "Add article"});
    }

    static addArticle = (req, res) => {
        const article = new Article(req.body);
        article.save()
            .then((result) => {
                res.send(result);
            })
            .catch(() => res.send(500));
    }

    static getUpdateArticlePage = (req, res) => {
        const id = req.params.id;
        Article.findById(id)
            .then(article => {
                res.render("update", {header: "Update article", article: article});
            })
            .catch(() => res.render("notFoundArticle"))
    }

    static getArticlePageById = (req, res) => {
        const id = req.params.id;
        Article
            .findById(id)
            .then((article) => {
                res.render("article", {article});
            })
            .catch(() => res.render("notFoundArticle"))
    }

    static deleteArticleById = (req, res) => {
        const id = req.params.id;
        Article.findByIdAndDelete(id)
            .then((result) => {
                res.sendStatus(204);
            })
            .catch(() => res.sendStatus(500));
    }

    static updateArticleById = (req, res) => {
        const id = req.params.id;
        const article = req.body;
        Article.findByIdAndUpdate(id, article)
            .then(result => {
                res.send(result);
            })
            .catch(() => res.sendStatus(500));
    }
}

module.exports = ArticleController;