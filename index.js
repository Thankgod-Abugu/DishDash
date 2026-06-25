import express from "express";
// import bodyParser from "body-parser";
import ejs from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";

// file path from c: till dishdash folder
const __dirname = dirname(fileURLToPath(import.meta.url));

// express app
const app = express();
const port = 3000;

// middlewares
app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));

// Serve the home page
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/public/home.html");
// });

app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Serve the menu page
// app.get("/menu", (req, res) => {
//     res.sendFile(__dirname + "/public/menu.html");
// });

app.get("/menu", (req, res) => {
    res.render("menu.ejs");
});

app.use((req, res) => {
    res.status(404).send("<h1>page not found</h1>");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
