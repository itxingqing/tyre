const path = require('path');
const fs = require('fs');

class helper {

    /**
     * @param {date} date 日期函数
     * @param {string} format 格式化的字符串: yyyy-MM-dd HH:mm:ss:SS
     * 
     * @return {string} 格式化后的字符串
     */
    static dateFormat(date, format) {
        var o = {
            "M+": date.getMonth() + 1, //month 
            "d+": date.getDate(), //day 
            "h+": date.getHours(), //hour 
            "m+": date.getMinutes(), //minute 
            "s+": date.getSeconds(), //second 
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter 
            "S": date.getMilliseconds() //millisecond 
        }

        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }

    /**
     * @param {boolean} separator 是否添加分隔符
     * 
     * @return {string} 生成
     */
    static guid(separator) {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;

            if (separator && ((i == 8) || (i == 12) || (i == 16) || (i == 20))) {
                guid += "-";
            }
        }
        return guid.toLocaleLowerCase();
    }

    /**
     * 
     * @param {String} paths 自动引入的目录, 数组
     * @param {Fcunction}} callback 回调方法, 注入两个参数，一个是引入的文件，一个是文件名称
     */
    static autoImportFile(paths, callback, pathArray) {
        pathArray = pathArray || [];

        paths.forEach(p => {
            var fileList = fs.readdirSync(p),
                dirArr = [];

            fileList.forEach(item => {
                var file = path.resolve(p, item),
                    stat = fs.statSync(file),
                    filePath = path.join(p, item);

                if (stat.isDirectory()) {
                    dirArr.push(filePath);
                    pathArray.push(item);

                } else if (path.extname(item) == '.js') {

                    var fileContent = require(filePath);
                    callback && callback(fileContent, item, pathArray);
                }
            });

            if (dirArr.length) {
                autoImportFile(dirArr, callback, pathArray);
            }
        });
    }

    static getClientPath(){
        return path.resolve(__dirname, '../../client/dist');
    }
}

module.exports = helper;