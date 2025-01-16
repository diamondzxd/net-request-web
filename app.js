const express = require('express');
const os = require('os');
const { networkInterfaces } = require('os');

const app = express();
app.disable('x-powered-by');
const PORT = 3000;

const hostname = os.hostname();
const ipAddress = getLocalIP();

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

app.use((req, res, next) => {
    res.append('Served-By', hostname);
    next();
});

// Serve the homepage
app.get('/', (req, res) => {
    const greeting = 'This request is served by:';

    res.send(`
        <!DOCTYPE html>
    <html>
    <head>
        <title>Sample Webpage</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                color: #333;
            }
            h1 {
                color:rgb(18, 73, 155);
                font-size: 2em;
                margin-bottom: 20px;
            }
            p {
                font-size: 1.2em;
                margin: 10px 0;
            }
            .container {
                text-align: center;
                padding: 20px 30px;
                border: 2px solid #ddd;
                border-radius: 10px;
                background: white;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .footer {
                margin-top: 20px;
                font-size: 0.9em;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>${greeting}</h1>
            <p><strong>Hostname:</strong> ${hostname}</p>
            <p><strong>IP Address:</strong> ${ipAddress}</p>
        </div>
        <div class="footer">
            Powered by <a href="https://piyush.ovh" target="_blank">https://piyush.ovh</a>
        </div>
    </body>
    </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

