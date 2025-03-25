const portscanner = require('portscanner');
const fetch = require('node-fetch');

const targetIP = '192.168.100.4'; // Change to the target IP
const importantPorts = [22, 80, 443, 5555, 3389, 8080]; // Add other necessary ports

async function scanPorts() {
    console.log(`Scanning ${targetIP} for important ports: ${importantPorts.join(', ')}`);

    let openPorts = [];

    for (let port of importantPorts) {
        try {
            let status = await portscanner.checkPortStatus(port, { host: targetIP });
            if (status === 'open') {
                openPorts.push(port);
                console.log(`Port ${port} is OPEN on ${targetIP}`);
            }
        } catch (error) {
            console.error(`Error scanning port ${port}:`, error.message);
        }
    }

    console.log(`Scanning completed! Open ports: ${openPorts.join(', ')}`);

    // Check for web servers on HTTP/S ports
    if (openPorts.includes(80) || openPorts.includes(443)) {
        checkWebServer(targetIP, 80);
        checkWebServer(targetIP, 443);
    }
}

// Function to check if a web server is running on a given port
async function checkWebServer(ip, port) {
    try {
        let response = await fetch(`http://${ip}:${port}`);
        console.log(`Web server detected on ${ip}:${port} - Status: ${response.status}`);
    } catch (error) {
        console.log(`No response from ${ip}:${port}`);
    }
}

// Start scanning
scanPorts();
