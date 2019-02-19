# Request

## Router

```
const { router } = require('way-libs/request');

router.route('/test').get(testcontroller.test);
```

## Validate

```
const { params, body, query } = require('way-libs/request/validate');
```

or

```
const { validate } = require('way-libs/request');

// validate.params
// validate.body
// validate.query
```

## Unifying usage

```
const { router, validate } = require('way-libs/request');
const myschema = require('./myschema');

router.route('/test').get(validate.params(myschema), testcontroller.test);
```