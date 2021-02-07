const uploadFile = require("../middleware/upload");
const compressFile = require("../compress/compress-file.js");
const AdmZip = require('adm-zip');
const fs = require("fs");
const util = require("util");
const myUtil = require("../util");

const readDir = util.promisify(fs.readdir);

const upload = async (req, res) => {
    try {
        req.dirName = myUtil.createDir();
        await uploadFile(req, res);
        myUtil.removeDirTimeout(req.dirName, 1000*60*5); // удаляем через 5 минут

        if (req.files == undefined) {
            return res.status(400).send({message: "Please upload a file!"});
        }

        res.status(200).send({
            dirName: req.dirName, //+ req.files.originalname,
        });
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 100MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: `, //${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    if (!req.query.dirName) {
        res.status(200).send(null);
        return;
    }

    let directoryPath = __basedir + "/uploads/";
        directoryPath += req.query.dirName + "/";

    readDir(directoryPath).then(files=>{
        const fileInfos = files.map(file => {
            const fileStats = fs.statSync(directoryPath + file);
            return {
                name: file,
                size: (fileStats.size / (1024 * 1024)).toFixed(3),
            }
        });
        res.status(200).send(fileInfos);
    }).catch(err=>{
        console.log(err);
        res.status(500).send({
            message: "Unable to scan files!",
        });
    });
};

const download = (req, res) => {
    if (!req.query.dirName) {
        res.status(200).send(null);
        return;
    }

    const zip = new AdmZip();
    const directoryPath = __basedir + "/uploads/";
    const dirName = req.query.dirName;
    const fullPath = directoryPath + dirName;

    const fileList = fs.readdirSync(fullPath);

    fileList.forEach(file=>{
        zip.addLocalFile(`${fullPath}/${file}`);
    });

    const data = zip.toBuffer();
    res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${Date.now()}.zip`);
    res.set('Content-Length',data.length);
    res.send(data);

    console.log(`download dir: ${req.query.dirName}`);

    // res.download(directoryPath + dirName, dirName, (err) => {
    //     if (err) {
    //         res.status(500).send({
    //             message: "Could not download the file. " + err,
    //         });
    //     }
    // });
};

const onCompressFiles = async (req, res) => {
    try {
        if (!req.query.dirName) {
            res.status(500).send(null);
            return;
        }
        const dirPath = await compressFile(req.query.dirName);
        res.status(200).send(dirPath);
        // getListFiles(req, res);
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 100MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: `, //${req.file.originalname}. ${err}`,
        });
    }
};

module.exports = {
    upload,
    getListFiles,
    download,
    onCompressFiles,
};
