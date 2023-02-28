const express = require("express");
const path = require("path");
const serverRoutes = require("./routes/servers.js");

const PORT = process.env.PORT ?? 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "ejs"));

app.use("/js", express.static(path.join(__dirname, "ejs/js")));
app.use("/articles/js", express.static(path.join(__dirname, "ejs/js")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(serverRoutes);

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});

