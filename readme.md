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
            buildnumber: 'dest',
            exclude: {
                'key': null
                'background.scripts': 'scripts/test-script.js'
            },
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

- `dest`: increase build number in dest only
- `both`: increase build number in both origin and dest
- `String`: version in [this format](http://developer.chrome.com/apps/manifest/version)
- `undefined` or `false`: do not increase build number

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
