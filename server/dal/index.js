const path = require('path');

const dal = {};

helper.autoImportFile([
    path.resolve(__dirname, './'),
], [
    //排除index.js
    path.resolve(__dirname, './index.js')
], (fileContent, fileName, pathArray) => {
    dal[fileName.replace(/\.js$/, '') + 'Dal'] = fileContent;
});

module.exports = dal;