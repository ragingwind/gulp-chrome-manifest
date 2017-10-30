'use strict';

import test from 'ava';
import Manifest from '../';
import fs from 'fs';
import path from 'path';
import gutil from 'gulp-util';

process.chdir(path.join(__dirname, 'fixtures'));

var srcString = fs.readFileSync('manifest.json');
var srcFile = new gutil.File({
	path: 'manifest.json',
	contents: new Buffer(srcString)
});

test.cb('should returns updated version', t => {
	var stream = new Manifest({
		buildnumber: true
	});

	stream.on('data', function (file) {
		if (file.path.indexOf('manifest.json') >= 0) {
			t.ok(JSON.parse(file.contents).version === '0.0.2');
		}
	});

	stream.on('end', t.end);
	stream.write(srcFile);
	stream.end();
});

test.cb('should returns updated version', t => {
	var stream = new Manifest({
		buildnumber: '1.0.0'
	});

	stream.on('data', function (file) {
		if (file.path.indexOf('manifest.json') >= 0) {
			t.ok(JSON.parse(file.contents).version === '1.0.0');
		}
	});

	stream.on('end', t.end);
	stream.write(srcFile);
	stream.end();
});

test.cb('should returns excluded props', t => {
	var stream = new Manifest({
		exclude: [
			'key',
			{
				'background.scripts': [
					'scripts/user-script.js',
					'components/jquery/jquery.min.js',
					'scripts/willbe-remove-only-for-debug.js',
					'scripts/background.js'
				]
			}
		]
	});

	var files = [];

	stream.on('data', function (file) {
		var filePath = path.relative(path.join(__dirname, 'fixtures'), file.path);
		files.push(filePath);

		if (filePath.indexOf('manifest.json') >= 0) {
			var manifest = JSON.parse(file.contents);
			t.ok(!manifest.key);
			t.ok(manifest.background.scripts.indexOf('components/jquery/jquery.min.js') === -1);
			t.ok(manifest.background.scripts.indexOf('scripts/willbe-remove-only-for-debug.js') === -1);
		}
	});

	stream.on('end', function () {
		t.ok(files.indexOf('scripts/willbe-remove-only-for-debug.js') === -1);
		t.ok(files.indexOf('components/jquery/jquery.min.js') === -1);
		t.ok(files.indexOf('scripts/user-script.js') === -1);
		t.ok(files.indexOf('scripts/background.js') === -1);
		t.end();
	});

	stream.write(srcFile);
	stream.end();
});

test.cb('should returns excluded background', t => {
	var stream = new Manifest({
		exclude: [
			'background'
		]
	});

	var files = [];

	stream.on('data', function (file) {
		var filePath = path.relative(path.join(__dirname, 'fixtures'), file.path);
		files.push(filePath);

		if (filePath.indexOf('manifest.json') >= 0) {
			var manifest = JSON.parse(file.contents);
			t.ok(!manifest.background);
		}
	});

	stream.on('end', function () {
		t.ok(files.indexOf('scripts/willbe-remove-only-for-debug.js') === -1);
		t.ok(files.indexOf('components/jquery/jquery.min.js') === -1);
		t.ok(files.indexOf('scripts/user-script.js') === -1);
		t.ok(files.indexOf('scripts/background.js') === -1);
		t.end();
	});

	stream.write(srcFile);
	stream.end();
});

test.cb('should returns web accessible resources', t => {
	var stream = new Manifest();
	var files = [];

	stream.on('data', function (file) {
		var filePath = path.relative(path.join(__dirname, 'fixtures'), file.path);
		files.push(filePath);

		if (filePath.indexOf('manifest.json') !== -1) {
			var manifest = JSON.parse(file.contents);
			t.ok(manifest.web_accessible_resources);
		}
	});

	stream.on('end', function () {
		t.ok(files.indexOf('scripts/contentscript-100.js') !== -1);
		t.ok(files.indexOf('styles/contentstyle-100.css') !== -1);
		t.end();
	});

	stream.write(srcFile);
	stream.end();
});
