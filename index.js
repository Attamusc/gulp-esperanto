'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var esperanto = require('esperanto');

var typeMap = {
  amd: 'toAmd',
  cjs: 'toCjs'
};

function esperantoStream(config) {
  config = config || { type: 'amd' };

  var conversionFn = typeMap[config.type];

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-esperanto', 'Streaming is not currently supported'));
      return;
    }

    var convertedContents = esperanto[conversionFn](file.contents.toString(), { defaultOnly: config.defaultOnly });

    file.contents = new Buffer(convertedContents);
    this.push(file);

    cb();
  });
}

module.exports = esperantoStream;
