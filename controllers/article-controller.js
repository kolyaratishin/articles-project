const articles = require("../fake-data");

class ArticleController {
    static getAllArticlesPage = (req, res) => {
        res.render("articles", {articles});
    }
    static getAddArticlePage = (req, res) => {
        res.render("add-article");
    }
    static addArticle = (req, res) => {
        const article = req.body;
        articles.push(article);
        res.send(JSON.stringify(article));
    }

    static getArticleById = (req, res) => {
        const id = req.params.id;
        const article = articles.find(article => article.id === id);
        res.render("article", {article});
    }

    static deleteArticleById = (req, res) => {
        const id = req.params.id;
        const article = articles.find(article => article.id === id);
        const indexOfArticle = articles.indexOf(article);
        articles.splice(indexOfArticle, 1);
        res.sendStatus(204);
    }
}


module.exports = ArticleController;