const fs = require('fs');
const util = require("util");

const readDir = util.promisify(fs.readdir);

const createUploidDir = () => {
    const dir = __basedir + "/uploads";
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

const createDir = () => {
    const dirPath = __basedir + "/uploads";
    const dirName = String(Date.now());
    const fullPath = `${dirPath}/${dirName}`;

    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
    }
    return dirName;
}

const removeDirTimeout = (dirName, time) => {
    const dirPath = __basedir + "/uploads";
    const fullPath = `${dirPath}/${dirName}`;
    setTimeout(function() {
        readDir(fullPath).then(fileList=>{
            fileList.forEach(file=>{
                const filePath = fullPath + "/" + file;
                fs.unlinkSync(filePath);
            })
            return;
        }).then(() => {
            console.log(`Удаляем папку "${dirName}" !!!`);
            if (fs.existsSync(fullPath)) {
                fs.rmdirSync(fullPath);
            }
        }).catch(err=>console.log(err));
    }, time);
}

module.exports = {
    createUploidDir,
    createDir,
    removeDirTimeout,
};
