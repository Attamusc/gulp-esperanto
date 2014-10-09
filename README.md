# gulp-esperanto [![Build Status](https://travis-ci.org/Attamusc/gulp-esperanto.svg?branch=master)](https://travis-ci.org/Attamusc/gulp-esperanto)

> Gulp plugin to transpile ES6 module syntax with [esperanto](https://github.com/Rich-Harris/esperanto)

**Issues with output should be reported to the [esperanto issue tracker](https://github.com/Rich-Harris/esperanto/issues).**


## Install

```sh
$ npm install --save-dev gulp-esperanto
```


## Usage

```js
var gulp = require('gulp');
var esperanto = require('gulp-esperanto');

gulp.task('default', function () {
	return gulp.src('src/app.js')
		.pipe(esperanto())
		.pipe(gulp.dest('dist'));
});
```


## Usage

### esperanto(config)

#### config.type

Can be one of 'amd' or 'cjs' (CommonJS) to set the desired format of the output

#### config.defaultOnly

[config.defaultOnly](https://github.com/Rich-Harris/esperanto/wiki/defaultOnly) is passed straight through to esperanto.

## License

MIT © Sean Dunn
