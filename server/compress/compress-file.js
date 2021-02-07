//из такого названия папки "ito-avantelnsk-sprite_2020-12-03" в такое "avantelnsk"
// var newName = dir.split("-")[1]; берет название между первым и вторым знаком "-"
const sharp = require('sharp');
const fs = require('fs');
const util = require("util");

const readDir = util.promisify(fs.readdir)
const unlink = util.promisify(fs.unlink)
const rename = util.promisify(fs.rename)

const compressFile = function(dirPath) {
    return new Promise( (resolve, reject) => {
        if (!dirPath) {
            reject({error: `not found dir: ${dirPath}`});
        }
        const initDirPath = dirPath;
        dirPath = `./uploads/${dirPath}`
        readDir(dirPath).then(fileList => {
            fileList.forEach( file => {
                const filePath = dirPath + "/" + file,
                    newFilePath = dirPath + "/" + "new_" + file;
                //Оптимизация compressionLevel = 8
                sharp(filePath).png({compressionLevel: 8}).toFile(newFilePath).then( () => {
                    // удаляем не оптимизированный картинку
                    return unlink(filePath);
                }).then( () => {
                    // оптимезированный переименовываем в старое название
                    return rename(newFilePath, filePath);
                }).then( () => {
                    console.log(`Вce: ${filePath}`)
                    resolve(initDirPath);
                }).catch(err=>{
                    console.log(err);
                    reject(err);
                })
            });
        }).catch(err => {
            reject(err);
        });
    });
}

// const compress = util.promisify(compressFile);
module.exports = compressFile;
