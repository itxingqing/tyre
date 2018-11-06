const {
    productDal
} = require('../dal/index');
const {
    typeDal
} = require('../dal/index');
const fs = require('fs');
const config = require('../config/base');
const path = require('path');
const cheerio = require('cheerio');

class ProductBll {

    async findByPage(pageIndex, pageSize) {
        return await productDal.findByPage((pageIndex - 1) * pageSize, pageSize);
    }

    async findByID(id) {
        return await productDal.findByID(id);
    }

    //新增
    async add(obj) {

        let movePath = [],
            result = {
                data: {},
                message: ''
            }

        if (obj.content != '') {
            let editData = this.getEditorImageUrl(obj.content, new RegExp('^' + config.uploadTempRemotePath), config.uploadProductRemotePath);

            obj.content = editData.text;
            movePath = movePath.concat(editData.imageArr);
        }

        if (obj.p_img) {
            movePath = movePath.concat(obj.p_img);
        }

        for (var i = 0; i < movePath.length; i++) {
            var item = movePath[i];
            this.moveTempToProduct(path.join(config.distPath, item));
        }

        for (var i = 0; i < obj.p_img.length; i++) {
            var item = obj.p_img[i];

            obj.p_img[i] = item.replace(new RegExp('^' + config.uploadTempRemotePath), config.uploadProductRemotePath);
        }

        let ty_exists = !!await typeDal.findByTypeName(obj.ty_name);

        //检查产品类型
        if(ty_exists){
            result.data = await productDal.add(obj);
        }else{
            result.message = '产品类型不存在.';
        }

        return result;
    }

    //修改
    async edit(id, obj) {
        let row = await productDal.findByID(id),
            result = {
                data: null,
                message: ''
            };

        if (row) {
            let oldImgPath = row.p_img,
                odlEditData = this.getEditorImageUrl(row.content || ''),
                oldImgArr = oldImgPath.concat(odlEditData.imageArr),
                newImgPath = obj.p_img,
                newEditData = this.getEditorImageUrl(obj.content || '', new RegExp('^' + config.uploadTempRemotePath), config.uploadProductRemotePath),
                newImgArr = newImgPath.concat(newEditData.imageArr),
                removeArr = [],
                oldFastKey = {};

            for (var i = 0; i < oldImgArr.length; i++) {
                var item = oldImgArr[i];

                oldFastKey[item] = true;
            }

            var i = 0;
            while (i < newImgArr.length) {
                if (oldFastKey[newImgArr[i]]) {
                    //同时处理两个数组
                    delete oldFastKey[newImgArr[i]];
                    newImgArr.splice(i, 1);
                } else {
                    i++;
                }
            }

            for(var i = 0; i < newImgArr.length; i++){
                this.moveTempToProduct(path.join(config.distPath, newImgArr[i]));
            }

            for (var key in oldFastKey) {
                removeArr.push(key);
            }

            for (var i = 0; i < removeArr.length; i++) {
                var item = removeArr[i];

                removeArr[i] = path.join(path.join(config.distPath, item));
            }

            //更新url
            for (var i = 0; i < obj.p_img.length; i++) {
                var item = obj.p_img[i];
    
                obj.p_img[i] = item.replace(new RegExp('^' + config.uploadTempRemotePath), config.uploadProductRemotePath);
            }

            this.unlinkFile(removeArr);

            let ty_exists = !!await typeDal.findByTypeName(obj.ty_name);

            //更新text值
            obj.content = newEditData.text;

            //检查产品类型
            if(ty_exists){
                !!await productDal.update(id, obj);

                result.data = await productDal.findByID(id);                
            }else{
                result.message = '产品类型不存在.';
            }
        } else {
            result.message = '记录不存在';
        }

        return result;
    }

    //删除
    async del(id) {
        let row = await this.findByID(id),
            message = '';

        if (row) {
            let imgPath = row.p_img,
                editorData = this.getEditorImageUrl(row.content);

            imgPath = imgPath.concat(editorData.imageArr);

            for (var i = 0; i < imgPath.length; i++) {
                var item = imgPath[i];

                imgPath[i] = path.join(path.join(config.distPath, item));
            }

            this.unlinkFile(imgPath);

            let delRs = !!await productDal.delete(id);

            message = delRs ? '' : '删除失败，请重试.'

        } else {
            message = '记录不存在';
        }

        return message;
    }

    //是否替换
    getEditorImageUrl(text, testImagePath, replaceImagePath) {
        let $ = cheerio.load(text),
            imagePathArr = [],
            imgs = $('img');

        imgs.each((index, item) => {
            var url = item.attribs['src'];

            imagePathArr.push(url);

            if (testImagePath) {
                item.attribs['src'] = url.replace(testImagePath, replaceImagePath)
            }
        });

        return {
            text: $.html('p'),
            imageArr: imagePathArr
        };
    }

    //移动product的文件到temp
    moveProductToTemp(file) {
        try {
            fs.statSync(config.uploadTempPath);
        } catch (error) {
            fs.mkdirSync(config.uploadTempPath);
        }

        let fileName = path.basename(file);

        this.moveFile(file, path.join(config.uploadTempPath, fileName));
    }

    //移动product的文件到temp
    moveTempToProduct(file) {
        try {
            fs.statSync(config.uploadProductPath);
        } catch (error) {
            fs.mkdirSync(config.uploadProductPath);
        }

        let fileName = path.basename(file);

        this.moveFile(file, path.join(config.uploadProductPath, fileName));
    }

    //移动文件
    moveFile(from, to) {
        fs.renameSync(from, to);
    }

    //删除文件
    unlinkFile(arr) {
        try {
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];

                fs.unlinkSync(item);
            }
        } catch (error) { //出错了不用管
            //no do   
        }
    }
}

module.exports = new ProductBll();