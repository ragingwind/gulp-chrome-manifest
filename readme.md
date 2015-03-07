#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Gulp plugin for Chrome Manifest

## Getting Started

The gulp plugin manages name/value in manifest of Chrome Apps or Extensions. You can get a new manifest that has newer version for app or properties has been removed or modified for production version.


## Install

```sh
$ npm install --save gulp-chrome-manifest
```


## Usage

```js
var manifest = require('gulp-chrome-manifest');
gulp.task('manifest', function() {
    return gulp.src(['app/manifest.json'])
        .pipe(manifest({
            buildnumber: true,
            exclude: [
	            'key',
	            {
	            	'background.scripts': [
	            		'scripts/test-script1.js',
	            		'scripts/willbe-remove-only-for-debug.js'
	            	]
	            }
            ],
            overwrite: {
               'name': 'Here is new name for App'
            }
        }))
        .pile($.if('*.js', $.uglify({preserveComments: 'some'})))
        .pile($.if('*.css', $.cssmin()))
        .pipe(gulp.dest('dist'))
});
```

## Options

### buildnumber

Auto-increment version in manifest. Can be:

- `true`: Increase build number
- `false` or `undefined`: Do not increase build number
- `String`: Update version as passed value. version should be in [this format](http://developer.chrome.com/apps/manifest/version)

### exclude 

Exclude fields from source manifest.json. Using `exclude`, If there is fields you don't want to publish.

### overwrite

Overwrite other value to specific field. For example, You can change the key value to the production key value.

## License

MIT © [ragingwind](http://ragingwind.me)


[npm-url]: https://npmjs.org/package/gulp-chrome-manifest
[npm-image]: https://badge.fury.io/js/gulp-chrome-manifest.svg
[travis-url]: https://travis-ci.org/ragingwind/gulp-chrome-manifest
[travis-image]: https://travis-ci.org/ragingwind/gulp-chrome-manifest.svg?branch=master
[daviddm-url]: https://david-dm.org/ragingwind/gulp-chrome-manifest.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/ragingwind/gulp-chrome-manifest
