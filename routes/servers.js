const express = require("express");
const router = express.Router();
const getMainPage = require("../controllers/main-controller");
const ArticleController = require("../controllers/article-controller");

router.get("/", getMainPage);

router.get("/articles", ArticleController.getAllArticlesPage);

router.get("/add-article", ArticleController.getAddArticlePage);

router.get("/update/:id", ArticleController.getUpdateArticlePage);

router.post("/articles", ArticleController.addArticle);

router.get("/articles/:id", ArticleController.getArticleById);

router.delete("/articles/:id", ArticleController.deleteArticleById);

router.put("/articles/:id", ArticleController.updateArticleById);

module.exports = router;