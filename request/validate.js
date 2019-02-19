const Joi = require("joi");

const getDataError = (error) => {
    data = error.details.map(element => {
        return {
            path: element.path,
            message: element.message
        }
    });

    return data;
}

module.exports = {
    validateParams: (schema, name) => {
        return (req, res, next) => {
            let result = Joi.validate(req.params, schema)

            if (result.error) {
                return res.status(400).json({
                    error: getDataError(result.error)
                });
            }
            else {
                if (!req.value)
                    req.value = {};
                if (!req.value['params'])
                    req.value['params'] = {};

                req.value['params'][name] = result.value[name];
                next();
            }
        }
    },

    validateQuery: (schema) => {
        return (req, res, next) => {
            let result = Joi.validate(req.query, schema);

            if (result.error) {
                return res.status(400).json({
                    error: getDataError(result.error)
                });
            }
            else {
                if (!req.value)
                    req.value = {};
                if (!req.value['query'])
                    req.value['query'] = {};

                req.value['query'] = result.value;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            let result = Joi.validate(req.body, schema);

            if (result.error) {

                return res.status(400).json({
                    error: getDataError(result.error)
                });
            }
            else {
                if (!req.value)
                    req.value = {};
                if (!req.value['body'])
                    req.value['body'] = {};

                req.value['body'] = result.value;
                next();
            }
        }
    }
}