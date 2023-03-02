const {getDb} = require("../db/db");
const {ObjectId} = require("mongodb");

function getDatabase() {
    return new Promise((resolve, reject) => {
        const db = getDb();
        if (db) {
            resolve(db);
        } else {
            reject(new Error("Cannot get db"));
        }
    })
}

class ArticleController {
    static getAllArticlesPage = (req, res) => {
        const articles = [];
        getDatabase().then(db => {
            db.collection("articles")
                .find()
                .forEach(article => articles.push(article))
                .then(() => {
                    res.render("articles", {articles});
                });
        });
    }
    static getAddArticlePage = (req, res) => {
        res.render("add-article");
    }
    static addArticle = (req, res) => {
        const article = req.body;
        getDatabase().then(db => {
            db.collection("articles")
                .insertOne(article)
                .then(() => {
                    res.send(article);
                });
        });
        // articles.push(article);
        // res.send(JSON.stringify(article));
    }

    static getArticleById = (req, res) => {
        if (ObjectId.isValid(req.params.id)) {
            const id = req.params.id;
            getDatabase().then(db => {
                db.collection("articles")
                    .findOne({_id: new ObjectId(id)})
                    .then((article) => {
                        if (article) {
                            res.render("article", {article});
                        } else {
                            res.render("notFoundArticle");
                        }
                    });
            });
        } else {
            res.render("notFoundArticle");
        }
    }

    static deleteArticleById = (req, res) => {
        if (ObjectId.isValid(req.params.id)) {
            const id = req.params.id;
            getDatabase().then(db => {
                db.collection("articles")
                    .deleteOne({_id: new ObjectId(id)})
                    .then(() => {
                        res.sendStatus(204);
                    });
            });
        } else {
            res.sendStatus(500);
        }
    }
}


module.exports = ArticleController;