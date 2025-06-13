const fs = require("fs");

const path = require('path');

const logPath = path.join(__dirname, 'log.txt');

function logger(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    fs.appendFile(logPath, logMessage, (err) => {
        if (err) {
            console.error('Erro ao escrever no log:', err);
        }
    });
}

module.exports = {
    logger
};