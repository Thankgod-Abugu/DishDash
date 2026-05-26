import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import pg from "pg";

// file path from c: till dishdash folder
const __dirname = dirname(fileURLToPath(import.meta.url));

// express app
const app = express();
const port = 3000;

// postgreSQL connection
const { Pool } = pg;
const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "dishdash",
    password: "sql12345",
    port: 5432,
});

// middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve the home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

// Serve the menu page
app.get("/menu", (req, res) => {
    res.sendFile(__dirname + "/public/menu.html");
});

//  getting data from Checkout
app.post("/place-order", async (req, res) => {
    // get user credentials from the checkout section
    const { full_name, phone_number, location, carts, total_price } = req.body;

    // query dishdash database and fill table with user credentials
    try {
        const query = `
      INSERT INTO orders (full_name, phone_number, delivery_location, food_items, total_price)
      VALUES ($1, $2, $3, $4, $5) RETURNING id, order_date;
    `;
        const values = [full_name, phone_number, location, JSON.stringify(carts), total_price];
        const result = await db.query(query, values);

        // Formatting the date for the response: DD/MM/YYYY HH:mm
        const rawDate = result.rows[0].order_date;
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false
        }).format(rawDate).replace(',', '');

        res.status(200).json({
            message: "Success",
            orderId: result.rows[0].id,
            time: formattedDate
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving order" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
