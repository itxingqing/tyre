const path = require('path');

const dal = {};

helper.autoImportFile([
    path.resolve(__dirname, './'),
], (fileContent, fileName, pathArray) => {
    dal[fileName.replace(/\.js$/, '') + 'Dal'] = fileContent;
});

module.exports = dal;