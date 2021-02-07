const fs = require('fs');
let spriteDir = "C:/Users/DonSt/Desktop/sprite_script/sprites/";
let appDir = "C:/Work/ITLCS/itlcs/theme/";
let dirList = fs.readdirSync(spriteDir);
dirList.forEach(function (dir) {
    let dirPath = spriteDir + dir;
    console.log(`dirPath: ${dirPath}`);
    let fileList = fs.readdirSync(dirPath);
    fileList.forEach(function (file) {
        let filePath = dirPath + "/" + file;
        console.log(`filePath: ${filePath}`)
        let dstPath = appDir + dir + "/" + file;
        console.log(`dstPath:  ${dstPath}`);
        fs.createReadStream(filePath).pipe(fs.createWriteStream(dstPath));
    });
});
