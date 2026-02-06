import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
// --- file path from c: till dishdash folder ---
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// --- MIDDLEWARE ---
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// --- File Path to your Users.json ---
const USERS_FILE = `${__dirname}/users.json`;

// Reads the users.json file and converts the string content into a JavaScript array
function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    // If the file is empty, return an empty array
    return data ? JSON.parse(data) : [];
  } catch (error) {
    // If file doesn't exist or is invalid JSON, return an empty array
    return [];
  }
}

// Function to safely write user data to the JSON file
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

// --- ROUTE HANDLERS ---

// Serve the Signup page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});

// Serve the Login page
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// SIGN-UP LOGIC: Check for existence and save new user
app.post("/signup", async (req, res) => {
  const { username, password, "confirm-password": confirmPassword } = req.body;

  // 1. Basic Server-Side Validation (as a backup to client-side JS)
  if (!username || !password || password !== confirmPassword) {
    // Send error response back
    return res.status(400).send("Invalid input or passwords do not match.");
  }
  // existing users
  const currentUsers = readUsers();

  // 2. Check existence
  const doesUserExist = currentUsers.some((user) => user.username === username);

  if (doesUserExist) {
    // Redirect back to sign-up with an error indicator
    return res
      .status(409)
      .send("Username already exists. <a href='/'>Sign Up</a>");
  }

  // 3. Create the new user object (Storing password as plain text)
  const newUser = {
    username: username,
    password: password,
  };

  // 4. Update the list and write to the file
  currentUsers.push(newUser);
  writeUsers(currentUsers);

  // 5. Send the user to the login page
  res.redirect("/login");
});

// LOGIN LOGIC: Verify user credentials
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 1. Basic Server-Side Validation (as a backup to client-side JS)
  if (!username || !password) {
    return res.status(400).send("Please provide both username and password.");
  }
  // existing users
  const currentUsers = readUsers();

  // 2. Find user
  // Search the array for a user object with the matching username
  const foundUser = currentUsers.find((user) => user.username === username);

  // Check if the user was found and if the password matches exactly
  if (foundUser && foundUser.password === password) {
    // SUCCESS: Send the protected home page
    res.sendFile(__dirname + "/public/home.html");
  } else {
    // FAILURE: Credentials don't match
    res
      .status(401)
      .send("Invalid username or password. <a href='/login'>Try again</a>");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
