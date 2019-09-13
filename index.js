const loaderUtils = require('loader-utils');
const chalk = require('chalk');
const isolate = require('./libs/isolate');

module.exports = function(content) {
    const rawOptions = loaderUtils.getOptions(this);
    const options = rawOptions || {};
    const pfs = cml.config.get().platforms;
    content = isolate.isolate(content, this, options, pfs);
    return content;
}