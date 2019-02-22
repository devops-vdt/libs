function getDate(pattern) {
    const year = (new Date().getUTCFullYear()).toString().padStart(4, '0');
    const month = (new Date().getUTCMonth() + 1).toString().padStart(2, '0');
    const day = (new Date().getUTCDate()).toString().padStart(2, '0');

    const hour = (new Date().getHours()).toString().padStart(2, '0');
    const minute = (new Date().getMinutes()).toString().padStart(2, '0');

    return pattern
        .replace('Y', year)
        .replace('m', month)
        .replace('d', day)
        .replace('H', hour)
        .replace('i', minute);
}

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
        custom: (type) => {
            return (data) => {
                logger.log(type, data);
            };
        },

        logByPeriod: (pattern, data) => {
            logger.log(getDate(pattern), data);
        },

        logByYear: () => {
            return (data) => {
                logger.logByPeriod('Y', data);
            }  
        },

        logByMonth: () => {
            return (data) => {
                logger.logByPeriod('Y-m', data);
            }
        },

        logByDay: () => {
            return (data) => {
                logger.logByPeriod('Y-m-d', data);
            }
        },

        logByHour: () => {
            return (data) => {
                logger.logByPeriod('Y-m-d-H', data);
            }
        },

        logByMinute: () => {
            return (data) => {
                logger.logByPeriod('Y-m-d-H-i', data);
            }
        },
    
        log: (type, data) => {
            if (!process.env.LOG_CONSOLE) {
                logService.log(type, data);
            }

            const indent = !process.env.LOG_INDENT ? null : 4;
            console.log(`[LOG][${type}] ${JSON.stringify(data, null, indent)}`);
        }
    };

    return Object.freeze(logger);
}
