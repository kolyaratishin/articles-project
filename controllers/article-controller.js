const articles = require("../fake-data");

class ArticleController {
    static getAllArticlesPage = (req, res) => {
        res.render("articles", {articles});
    }
    static getAddArticlePage = (req, res) => {
        res.render("add-article");
    }
}


module.exports = ArticleController;