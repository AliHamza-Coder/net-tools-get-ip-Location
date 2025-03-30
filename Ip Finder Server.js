const express = require('express');
const os = require('os');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// Function to get local network IPs and MAC addresses
function getNetworkInfo() {
    const interfaces = os.networkInterfaces();
    let networkInfo = { ethernet: { ip: "Not Found", mac: "Not Found" }, wifi: { ip: "Not Found", mac: "Not Found" } };

    for (let key in interfaces) {
        for (let iface of interfaces[key]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                let macAddress = iface.mac;
                if (key.toLowerCase().includes('wi-fi') || key.toLowerCase().includes('wlan') || key.toLowerCase().includes('wireless')) {
                    networkInfo.wifi = { ip: iface.address, mac: macAddress };
                } else if (key.toLowerCase().includes('eth') || key.toLowerCase().includes('lan')) {
                    networkInfo.ethernet = { ip: iface.address, mac: macAddress };
                }
            }
        }
    }
    return networkInfo;
}

// API Endpoint to return both local and public IP
app.get('/network-info', async (req, res) => {
    try {
        const { data } = await axios.get('https://api64.ipify.org?format=json'); // Fetch public IP
        const networkInfo = getNetworkInfo();
        networkInfo.publicIP = data.ip; // Add public IP to response
        res.json(networkInfo);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch public IP" });
    }
});

// Start Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

