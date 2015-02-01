'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var applySourceMap = require('vinyl-sourcemaps-apply');
var objectAssign = require('object-assign');
var esperanto = require('esperanto');

module.exports = function(opts) {
  opts = opts || { type: 'amd' };

  var fn = 'to' + opts.type.charAt(0).toUpperCase() + opts.type.slice(1).toLowerCase();
  // amd => toAmd, cjs => toCjd, umd => toUmd

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-esperanto', 'Streaming is not currently supported'));
      return;
    }

    try {
      var fileOpts = objectAssign({}, opts, {
        sourceMap: !!file.sourceMap,
        sourceMapSource: file.relative,
        sourceMapFile: file.relative
      });

      var res = esperanto[fn](file.contents.toString(), fileOpts);

      if (file.sourceMap && res.map) {
        applySourceMap(file, res.map);
      }

      file.contents = new Buffer(res.code);
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-esperanto', err, {fileName: file.path}));
    }

    cb();
  });
}
