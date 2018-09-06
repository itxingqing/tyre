const path = require('path');

const bll = {};

helper.autoImportFile([
    path.resolve(__dirname, './'),
], (fileContent, fileName, pathArray) => {
    bll[fileName.replace(/\.js$/, '') + 'Bll'] = fileContent;
});

module.exports = bll;