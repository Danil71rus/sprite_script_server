//из такого названия папки "ito-avantelnsk-sprite_2020-12-03" в такое "avantelnsk"
// var newName = dir.split("-")[1]; берет название между первым и вторым знаком "-"

const fs = require('fs');
let spriteDir = "C:/Users/DonSt/Desktop/sprite_script/sprites/";
let dirList = fs.readdirSync(spriteDir);
dirList.forEach(function (dir) {
    let dirPath = spriteDir + dir;
    console.log(`dirPath: ${dirPath}`);
    var newName = dir.split("-")[1];
    console.log(`newName: ${newName}`);
    fs.renameSync(dirPath, spriteDir + newName);
});
