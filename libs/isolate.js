var loaderUtils = require('loader-utils');
const chalk = require('chalk');
var filterRegs = {};

// 检查是否存在不同平台代码块嵌套
function checkBlockFMT(content, _this) {
    var pfs = Object.keys(filterRegs);
    for (var i = 0; i < pfs.length; i++) {
        let filterReg = filterRegs[pfs[i]];
        // console.log('start-------', _this)
        try{
            if (filterReg.start.test(content) || filterReg.end.test(content)) {
                // console.error('代码块多态存在不通平台标识嵌套问题：', this.context);
                throw new Error(chalk.red(`
                    【代码块多态存在多态标识嵌套问题 】
                    文件位置: ${_this.resourcePath}
                    `))
                return false;
            }
        } catch(e) {
            console.log(e)
            return false;
        }
        
    }
    return true;
}
// 多态文件直接略过，不进行块级多态校验
function checkMultiFiles(_this, rawOptions, platforms) {
    const options = rawOptions || {};
    const pfs = platforms;
    for (let i = 0; i < pfs.length; i++) {
        const multiFReg = new RegExp(`\\.${pfs[i]}\\.cml$`);
        if (multiFReg.test(_this.resourcePath)) {
            return true;
        }
    }
}

function isolate(content, _this, rawOptions, pfs) {
    const options = rawOptions;
    if (checkMultiFiles(_this, rawOptions, pfs)) {
        return content;
    }
    pfs.forEach((item) => {
        var start = "\\/\\/\\s?--\\s?"+item+"\\s?--";
        var end = start + "\\/";
        filterRegs[item] = {
            start: new RegExp(start, "m"),
            end: new RegExp(end, "m"),
            reg: (new RegExp("("+start+")([\\s\\S]*?)("+end+")", "mg")),
        };
    })
    pfs.forEach((item) => {
        if (options.cmlType === item) { // 目标编译平台略过
            return;
        }
        content = content.replace(filterRegs[item].reg, (match, $1, $2, $3) => {
            var isValid = true;
            // TODO 错误检测，防止内容块头尾格式问题
            var objContent = $2;
            isValid = checkBlockFMT(objContent, _this);
            if (!isValid) { // 代码块校验不合法，报错+不处理代码
                return `${$1}${$2}${$3}`;
            }
            return "";
        })
    })
    return content;
}

module.exports = {
    isolate,
    checkMultiFiles,
}