const express = require('express');
const os = require('os');
const { networkInterfaces } = require('os');

const app = express();
const PORT = 3000;

// Helper function to get local IP address
function getLocalIP() {
    const nets = networkInterfaces();
    let localIP = 'Not available';

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip internal (i.e., 127.0.0.1) and non-IPv4 addresses
            if (net.family === 'IPv4' && !net.internal) {
                localIP = net.address;
                break;
            }
        }
    }
    return localIP;
}

// Serve the homepage
app.get('/', (req, res) => {
    const hostname = os.hostname();
    const ipAddress = getLocalIP();
    const greeting = 'Hello, welcome to this server!';

    res.send(`
        <html>
        <head>
            <title>Sample Webpage</title>
        </head>
        <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
            <h1>${greeting}</h1>
            <p><strong>Hostname:</strong> ${hostname}</p>
            <p><strong>IP Address:</strong> ${ipAddress}</p>
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

