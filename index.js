'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var Manifest = require('chrome-manifest');

module.exports = function (opts) {
	opts = opts || {};

  return through.obj(function(file, enc, cb) {
  	if (file.isNull()) {
  		cb(null, file);
  		return;
  	}

  	if (file.isStream()) {
  		cb(new gutil.PluginError('gulp-chrome-manifest', 'Streaming not supported'));
  		return;
  	}

  	// var manifestFile = file.clone();
  	var manifest = new Manifest();
  	manifest.load(JSON.parse(file.contents));

  	// patch version number
  	if (typeof opts.buildnumber === 'boolean') {
  		manifest.patch();
  	} else if (typeof opts.buildnumber === 'string') {
  		manifest.patch(opts.buildnumber);
  	}

  	// exclude
  	if (opts.exclude) {
  		manifest.exclude(opts.exclude);
  	}

		// push scripts/styles register in manifest
		// this.push

		// overwrite
  	if (opts.overwrite) {
  		Object.keys(opts.overwrite).forEach(function(key) {
  			manifest.set(key, opts.overwrite[key])
  		})
  	}

  	this.push(new gutil.File({
			path: file.path,
			contents: manifest.toBuffer()
		}));

  	cb();
  })
};
