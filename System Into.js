const express = require("express");
const cors = require("cors");
const os = require("os");

const app = express();
app.use(cors()); // Enable CORS for frontend access
const PORT = 3000;

// Get system details using 'os' module
app.get("/os-info", (req, res) => {
    const osInfo = {
        platform: os.platform(),
        architecture: os.arch(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpu: os.cpus(),
        hostname: os.hostname(),
        networkInterfaces: os.networkInterfaces(),
    };
    res.json(osInfo);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
