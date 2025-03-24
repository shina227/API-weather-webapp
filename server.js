require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, "public")));

// API route to send the API key successfully
app.get("/api/key", (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
