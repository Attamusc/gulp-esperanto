'use strict';

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var expect = require('chai').expect;

var esperanto = require('../');

var inputBasePath = path.join('test', 'input');
var outputBasePath = path.join('test', 'output');
var inputFiles = fs.readdirSync(path.join(process.cwd(), inputBasePath));

var profiles = {
  amd: { type: 'amd' },
  cjs: { type: 'cjs' },
  amdDefaults: { type: 'amd', defaultOnly: true },
  cjsDefaults: { type: 'cjs', defaultOnly: true }
};

describe('gulp-esperanto', function() {
  Object.keys(profiles).forEach(function(format) {
    var profile = profiles[format];
    var outputFiles = fs.readdirSync(path.join(process.cwd(), 'test' , 'output', format));

    describe(format, function() {
      inputFiles.forEach(function(file) {
        var sourcePath = path.join(inputBasePath, file);
        var expectedPath = path.join(outputBasePath, format, file);
        var stat;

        // Sync version of stat since we're doing this inside a `describe`
        // block as not to create unneccesary `it`s and `describe` can't
        // be made async in the way `it` can
        try {
          stat = fs.statSync(expectedPath);
        }
        catch(e) { return; }

        if (!stat.isFile()) { return; }

        var sourceFile = new gutil.File({
          path: sourcePath,
          cwd: 'test',
          base: inputBasePath,
          contents: fs.readFileSync(sourcePath)
        });

        it('"' + file + '" produces a buffer with contents matching "' + path.join(format, file) + '"', function(done) {
          var stream = esperanto(profile);
          var expectFileContents = fs.readFileSync(expectedPath).toString();

          stream
          .on('data', function(file) {
            expect(file.contents.toString()).to.equal(expectFileContents);
          })
          .on('end', done);

          stream.write(sourceFile);
          stream.end();
        });
      });
    });
  });
});
