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
    }

    static get Model() {
        return class BaseHttpModel extends BaseModel {
            constructor(endpoint) {
                super(endpoint, new Http());
            }

            _setMethod(method) {
                this.method = method;
                return this;
            }

            get() { return this._setMethod('get'); }
            post() { return this._setMethod('post'); }
            put() { return this._setMethod('put'); }
            delete() { return this._setMethod('delete'); }
            patch() { return this._setMethod('patch'); }

            setQuery(query) {
                this.query = query;
                return this;
            }

            addQuery(query) {
                this.query = { ...this.query, query };
                return this;
            }

            setData(data) {
                this.data = data;
                return this;
            }

            addData(data) {
                this.data = { ...this.data, data };
                return this;
            }

            setHeaders(headers) {
                this.headers = headers;
                return this;
            }

            addHeaders(headers) {
                this.headers = { ...this.headers, headers };
                return this;
            }

            setSuffix(suffix) {
                this.suffix = suffix;
                return this;
            }

            addSuffix(suffix) {
                this.suffix = `${this.suffix}${suffix}`;
                return this;
            }

            setId(id) {
                return this.setSuffix(`/${id}`);
            }

            call() {
                return new Promise((resolve, reject) => {
                    let queryParams = '';
                    if (Object.keys(this.query).length > 0) {
                        queryParams = `?${encodeURIComponent(this.query)}`;
                    }

                    const callObject = {
                        method: this.method || 'get',
                        url: `${this.host}${this.suffix}${queryParams}`,
                    };

                    if (Object.keys(this.headers).length > 0 || Object.keys(this.defaultHeaders).length > 0) {
                        callObject.headers = { ...this.headers, ...this.defaultHeaders };
                    }

                    if (Object.keys(this.data).length > 0) {
                        callObject.data = this.data;
                    }

                    require('axios')(callObject)
                        .then((response) => response.data)
                        .then((data) => {
                            resolve(data);
                        });
                });
            }
        };
    }
}

module.exports = Http;