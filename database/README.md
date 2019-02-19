# Database

You can use the database as follow

## Mysql

### Creating your datasource
`MainDatabase.js`
```
const { Drivers } = require('way-libs/database');
const knexConfig = require('./knexfile.json');

class MainDatabase extends Drivers.Mysql {
    constructor() {
        super(knexConfig);
    }
}

module.exports = MainDatabase;
```

### Creating your models
`Usuario.js`
```
const { BaseModel } = require('way-libs/database');
const MainDatabase = require('./MainDatabase');

class Usuario extends BaseModel {
    constructor() {
        super('tb_usuario', new MainDatabase());

        // this.setPrimaryKey('id'); // You can define the primary key, default 'id'
    }
}

module.exports = new Usuario();
```

### Functions

#### Usuario.find(where, fields, transaction)
- `where` is an object to filter (null for no-filters)
- `fields` is the fields you want to retrieve (null for everything)
- `transaction` Knex.Transaction object if you need to do that inside a transaction

#### Usuario.findById(id, fields, transaction)
- `id` is the id or an object of compounded ids you want to retrieve
- `fields` is the fields you want to retrieve (null for everything)
- `transaction` Knex.Transaction object if you need to do that inside a transaction

#### Usuario.update(where, payload, transaction)
- `where` is an object to filter
- `payload` is the object of fields to be updated with values
- `transaction` Knex.Transaction object if you need to do that inside a transaction

#### Usuario.updateById(id, payload, transaction)
- `id` is the id or an object of compounded ids you want to retrieve
- `payload` is the object of fields to be updated with values
- `transaction` Knex.Transaction object if you need to do that inside a transaction

#### Usuario.insert(payload, transaction)
- `payload` is the object of fields to be inserted with values
- `transaction` Knex.Transaction object if you need to do that inside a transaction

#### Usuario.insertMany(payload, transaction)
- `payload` is and array of object of fields to be inserted with values
- `transaction` Knex.Transaction object if you need to do that inside a transaction

#### Usuario.deleteById(id, transaction)
- `id` is the id or an object of compounded ids you want to retrieve
- `transaction` Knex.Transaction object if you need to do that inside a transaction

## Elasticsearch

### Creating your datasource
`Datasource.js`
```
const { Drivers } = require('way-libs/database');
const config = {
    index: 'database',
    hosts: [
        'https://'
    ]
};

class Datasource extends Drivers.Elasticsearch {
    constructor() {
        super(config);
    }
}

module.exports = Datasource;
```

### Creating your models
`Table.js`
```
const { BaseModel } = require('way-libs/database');
const Datasource = require('./Datasource');

class Table extends BaseModel {
    constructor() {
        super('table', new Datasource());

        // this.setPrimaryKey('id'); // You can define the primary key, default 'id'
    }
}

module.exports = new Table();
```

### Functions

#### Table.find(query)
- `query` object with the search params

#### Table.insert(payload)
- `payload` the object to be inserted *The pk must be inside*

#### Table.updateById(id, payload)
- `id` to be updated
- `payload` the object to be updated

#### Table.deleteById(id)
- `id` to be deleted