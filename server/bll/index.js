const path = require('path');

const bll = {};

helper.autoImportFile([
    path.resolve(__dirname, './'),
], [
    //排除index.js
    path.resolve(__dirname, './index.js')
], (fileContent, fileName, pathArray) => {
    bll[fileName.replace(/\.js$/, '') + 'Bll'] = fileContent;
});

module.exports = bll;