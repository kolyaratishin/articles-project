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
}


module.exports = ArticleController;