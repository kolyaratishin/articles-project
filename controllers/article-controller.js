const {getDb} = require("../db/db");
const {ObjectId} = require("mongodb");
const e = require("express");

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
        res.render("add-article", {header: "Add article"});
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
    }

    static getUpdateArticlePage = (req, res) => {
        if (ObjectId.isValid(req.params.id)) {
            const id = req.params.id;
            getArticleById(id).then((article) => {
                if (article) {
                    const model = {header: "Update article"};
                    model.article = article;
                    res.render("update", {header: "Update article", article: article});
                } else {
                    res.render("notFoundArticle");
                }
            });
        }
    }

    static getArticleById = (req, res) => {
        if (ObjectId.isValid(req.params.id)) {
            const id = req.params.id;
            getArticleById(id).then((article) => {
                if (article) {
                    res.render("article", {article});
                } else {
                    res.render("notFoundArticle");
                }
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

    static updateArticleById = (req, res) => {
        if (ObjectId.isValid(req.params.id)) {
            const id = req.params.id;
            const article = req.body;
            getDatabase().then(db => {
                db.collection("articles")
                    .updateOne({_id: new ObjectId(id)}, {$set: article})
                    .then(() => {
                        res.send(article);
                    });
            });
        } else {
            res.sendStatus(500);
        }
    }
}

function getArticleById(id) {
    return new Promise((resolve, reject) => {
        getDatabase().then(db => {
            db.collection("articles")
                .findOne({_id: new ObjectId(id)})
                .then((article) => {
                    resolve(article);
                });
        });
    })
}


module.exports = ArticleController;