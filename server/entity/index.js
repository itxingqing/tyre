const path = require('path');
const sequelize = require('../utils/dbUtils');

const models = {};

helper.autoImportFile([
    path.resolve(__dirname, './'),
], [
    //排除index.js
    path.resolve(__dirname, './index.js')
], (fileContent, fileName, pathArray) =>{
    models[fileName.replace(/\.js$/, '')] = sequelize.define(fileContent.name, fileContent.columns, fileContent.options);;
});

module.exports = models;