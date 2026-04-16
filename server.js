// ==============================
// IMPORTS
// ==============================
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

// ==============================
// APP SETUP
// ==============================
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Serve all frontend files (HTML, CSS, images)
app.use(express.static(__dirname));

// ==============================
// ENV VARIABLES
// ==============================
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// ==============================
// ROUTES
// ==============================

// ✅ Load index.html when opening root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ API to send message to Telegram
app.post("/send", async (req, res) => {
    const { name, message } = req.body;

    // Validation
    if (!name || !message) {
        return res.status(400).json({ error: "Missing data" });
    }

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: `💖 New Message\n\n👤 Name: ${name}\n💌 Message: ${message}\n\n⏰ ${new Date().toLocaleString()}`
        });

        res.json({ success: true });

    } catch (error) {
        console.error("Telegram Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to send message" });
    }
});

// ==============================
// SERVER START
// ==============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});