const Driver = require('./Driver');

class Elasticsearch extends Driver {
    constructor(config) {
        super();

        if (!config.index) {
            throw new Error('You need to specify index on configuration');
        }
        
        this.index = config.index;
        delete config.index;
        
        this.client = new require('elasticsearch').Client(config);
    }

    initialize(model) {
        model.client = this.client;
        model.index = this.index;
        model.pk = model.pk || 'id';

        model.find = this.find(model);
        model.insert = this.insert(model);
        model.updateById = this.updateById(model, model.insert);
        model.deleteById = this.deleteById(model);
    }

    insert(model) {
        return (payload) => {
            return new Promise((resolve, reject) => {
                if (!payload[model.pk]) {
                    throw new Error('Need to specify the pk on insertOrUpdate');
                }

                const document = {
                    index: this.index,
                    type: model.table,
                    id: payload[model.pk],
                    body: payload
                };

                this.client.index(document, (err, response, status) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(response);
                });
            });
        }
    }

    updateById(model, insertOrUpdate) {
        return (id, payload) => {
            const newPayload = { ...payload };
            newPayload[model.pk] = id;
            
            return insertOrUpdate(newPayload);
        }
    }

    deleteById(model) {
        return (id) => {
            return new Promise((resolve, reject) => {
                const filter = {
                    index: this.index,
                    type: model.table,
                    id
                };

                this.client.delete(filter, (err, response, status) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(response);
                });
            });
        }
    }

    count(model) {
        return () => {
            return new Promise((resolve, reject) => {
                const filter = { index: this.index, type: model.table };
                this.client.count(filter, (err, response, status) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(response);
                });
            });
        }
    }

    find(model) {
        return (query) => {
            return new Promise((resolve, reject) => {
                const filters = [];
                for(let key of Object.keys(query)) {
                    const filter = {};
                    
                    if (typeof(query[key]) === 'string') {
                        filter[`${key}.keyword`] = query[key];
                    } else {
                        filter[key] = query[key];
                    }

                    filters.push({ term: filter });
                }

                const filter = {
                    index: this.index,
                    type: model.table,
                    body: {
                        query: {
                            bool: {
                                must: filters
                            }
                        }
                    }
                };

                console.log(JSON.stringify(filter), 'filter');

                this.client.search(filter, (err, response, status) => {
                    if (err) {
                        reject(err);
                    }

                    if (response.hits && response.hits.hits) {
                        resolve(response.hits.hits.map((item) => item._source));
                    }

                    reject(response);
                });
            });
        }
    }
}

module.exports = Elasticsearch;