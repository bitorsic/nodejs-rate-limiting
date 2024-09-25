const path = require('path');
const fs = require('fs');

// using /logs/ directory for logging
const logDir = path.join(__dirname, '../logs');
// create directory if it doesn't exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = (message, filename) => {
    fs.appendFile(
        path.join(logDir, filename),
        message,
        (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        }
    )
}

module.exports = logger;
