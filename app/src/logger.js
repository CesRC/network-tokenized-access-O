'use strict';

const winston = require('winston');
const fs = require('fs');
const logDir = 'logs';
var config = require('./config')
var env = config.env

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const myFormat = winston.format.printf(info => {
    return `${info.timestamp} [${info.level}]: [${info.label}] - ${info.message}`;
});


function newLogger(theModule) {
    var logger;
    if (config.env == 'development') {
        logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.label({ label: theModule }),
                winston.format.timestamp(),
                // winston.format.simple()
                myFormat
            ),
            transports: [
                new (winston.transports.Console)({
                    timestamp: true,
                    level: 'info'
                })
            ]
        });
    } else {
        logger = winston.createLogger({
            format: winston.format.combine(
                // winston.format.colorize({ all: true }),
                winston.format.label(),
                winston.format.timestamp(),
                winston.format.label({ label: theModule }),
                // winston.format.simple()
                myFormat
            ),
            transports: [
                new (winston.transports.Console)({
                    timestamp: true,
                    level: 'info'
                }),
                new (winston.transports.File)({
                    filename: `${logDir}/results_${Date.now()}.log`,
                    timestamp: true,
                    level: env === 'development' ? 'debug' : 'info'
                })
            ]
        });
    }
    return logger
}

exports.logger = {
    nta: newLogger('NETWORK-TOKENIZED-ACCESS'), 
}