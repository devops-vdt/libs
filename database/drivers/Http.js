const Driver = require('./Driver');
const BaseModel = require('../models/BaseModel');

class Http extends Driver {
    constructor(config) {
        super();
        
        this.host = config.host;
        this.defaultHeaders = config.headers;
    }

    initialize(model) {
        model.host = this.host;
        model.defaultHeaders = this.headers;


        model._setMethod = (method) => {
            model.method = method;
            return model;
        }

        model.get = () => model._setMethod('get');
        model.post = () => model._setMethod('post');
        model.put = () => model._setMethod('put');
        model.delete = () => model._setMethod('delete');
        model.patch = () => model._setMethod('patch');

        model.setQuery = (query) => {
            model.query = query;
            return model;
        }

        model.addQuery = (query) => {
            model.query = { ...model.query, query };
            return model;
        }

        model.setData = (data) => {
            model.data = data;
            return model;
        }

        model.addData = (data) => {
            model.data = { ...model.data, data };
            return model;
        }

        model.setHeaders = (daheadersta) => {
            model.headers = headers;
            return model;
        }

        model.addHeaders = (data) => {
            model.headers = { ...model.headers, headers };
            return model;
        }

        model.setSuffix = (suffix) => {
            model.suffix = suffix;
            return model;
        }

        model.addSuffix = (suffix) => {
            model.suffix = `${model.suffix}${suffix}`;
            return model;
        }

        model.setId = (id) => {
            return this.setSuffix(`/${id}`);
        }

        model.call = () => {
            return new Promise((resolve, reject) => {
                let queryParams = '';
                if (Object.keys(model.query).length > 0) {
                    queryParams = `?${encodeURIComponent(model.query)}`;
                }

                const callObject = {
                    method: model.method || 'get',
                    url: `${model.host}${model.suffix}${queryParams}`,
                };

                if (Object.keys(model.headers).length > 0 || Object.keys(model.defaultHeaders).length > 0) {
                    callObject.headers = { ...model.headers, ...model.defaultHeaders };
                }

                if (Object.keys(model.data).length > 0) {
                    callObject.data = model.data;
                }

                require('axios')(callObject)
                    .then((response) => response.data)
                    .then((data) => {
                        resolve(data);
                    });
            });
        }
    }
}

module.exports = Http;