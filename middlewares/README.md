# Middlewares

## loggerRequests

```
const { loggerRequest } = require('way-libs/middleware');

app.use(loggerRequest());
```

The first param is a logger function

```
function loggerFunction(logData) {
    console.log(logData);
}

app.use(loggerRequest(loggerFunction));
```

The second param is the extract information from the request and response function

```
function loggerFunction(logData) {
    console.log(logData);
}

function extract(req, res) {
    return {
        hostname: req.hostname
    }
}
```