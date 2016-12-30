# mkdir-p

### Description
Linux command `mkdir -p`.

### Usage
#### Sync
```javascript
const mkdirP = require('mkdir-p');

// default mode
let result = mkdirP.sync('~/example/app/route');
console.log(result);  // /Users/fei/example/app/route

// specific mode
let result = mkdirP.sync('~/example/app/route', 755);
console.log(result);  // /Users/fei/example/app/route
```

#### Recursion
```javascript
const mkdirP = require('mkdir-p');

// default mode
mkdirP.recursion('~/example/app/route', function (error, result) {
    console.log(error, result);  // /Users/fei/example/app/route
});

// specific mode
mkdirP.recursion('~/example/app/route', 755, function (error, result) {
    console.log(error, result);  // /Users/fei/example/app/route
})
```
