import express from "express";
// import bodyParser from "body-parser";
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
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

// Serve the menu page
app.get("/menu", (req, res) => {
    res.sendFile(__dirname + "/public/menu.html");
});

app.use((req, res) => {
    res.status(404).send("page not found");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
