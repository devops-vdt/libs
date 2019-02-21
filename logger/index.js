module.exports = (config) => {
    if (!config) {
        throw Error('Logs aws keys not found');
    }

    if (!config.appName) {
        throw Error('appName not defined');
    }

    if (!config.uploadMaxTimer) {
        throw Error('uploadMaxTimer not defined');
    }

    const lawgs = require('lawgs');
    lawgs.config({
        aws: config
    });

    const logService = lawgs.getOrCreate(config.appName);
    logService.config({
        uploadMaxTimer: config.uploadMaxTimer
    });

    const logger = {
        type: (type) => {
            return (data) => {
                logger.log(type, data);
            };
        },
    
        log: (type, data) => {
            if (!process.env.LOG_CONSOLE) {
                logService.log(type, data);
            }

            console.log(`[LOG][${type}] ${JSON.stringify(data)}`);
        }
    };

    return Object.freeze(logger);
}
