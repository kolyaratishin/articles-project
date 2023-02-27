const articles = require("../fake-data");

class ArticleController {
    static getAllArticlesPage = (req, res) => {
        res.render("articles", {articles});
    }
}


module.exports = ArticleController;