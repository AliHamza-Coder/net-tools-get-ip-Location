const express = require("express");
const requestIp = require("request-ip");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.static("public")); // Serve static files

// API route for IP-based location lookup
app.get("/get-ip-location", async (req, res) => {
    const clientIp = requestIp.getClientIp(req) || "8.8.8.8"; // Default IP for testing
    try {
        const response = await axios.get(`http://ip-api.com/json/${clientIp}`);
        res.json(response.data); // Returns city, country, lat, lon, etc.
    } catch (error) {
        res.status(500).json({ error: "Could not fetch IP location" });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
