# Logger

## Applying logger

```
const loggerConfig = {
    accessKeyId: '',
	secretAccessKey: '',
	region: '',
	uploadMaxTimer: 3000,
	appName: "APP-NAME"
};

global logger = require('way-libs/logger')(loggerConfig);
```

### logger.log(type, data)
- `type` the type of logger
- `data` the data to be logged

### logger.type(type)
- `type` the type of logger

returns a function to log into that type

```
const loggerRequest = logger.type('request');
loggerRequest('test');
```

is the same of

```
logger.log('request', 'test');
```