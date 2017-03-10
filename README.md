# node-mkdir-p

### Description
Linux command `mkdir -p`.

### Usage
#### Sync
```javascript
const mkdirP = require('mkdir-p');

// default mode 0o755
const result = mkdirP.sync('~/example/app/route');
console.log(result);  // /Users/fei/example/app/route

// specific mode
const result = mkdirP.sync('~/example/app/route', 0o755);
console.log(result);  // /Users/fei/example/app/route
```

#### Recursion
```javascript
const mkdirP = require('mkdir-p');

// default mode 0o755
mkdirP.recursion('~/example/app/route', function (error, result) {
    console.log(error, result);  // /Users/fei/example/app/route
});

// specific mode
mkdirP.recursion('~/example/app/route', 0o755, function (error, result) {
    console.log(error, result);  // /Users/fei/example/app/route
})
```
