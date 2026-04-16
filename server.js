const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Use ENV variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Test route
app.get("/", (req, res) => {
    res.send("Server is running on Render 🚀");
});

// Send route
app.post("/send", async (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ error: "Missing data" });
    }

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: `💖 New Message\n\n👤 Name: ${name}\n💌 Message: ${message}\n⏰ ${new Date().toLocaleString()}`
        });

        res.json({ success: true });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Telegram send failed" });
    }
});

// ✅ Important for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});