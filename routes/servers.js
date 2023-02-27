const express = require("express");
const router = express.Router();
const getMainPage = require("../controllers/main-controller");
const ArticleController = require("../controllers/article-controller");

router.get("/", getMainPage);

router.get("/articles", ArticleController.getAllArticlesPage);

router.get("/add-article", ArticleController.getAddArticlePage);

module.exports = router;