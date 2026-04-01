module.exports.middlewareError = (file) => {
    console.log("🚀 ~ file: errors.midddleware.js:13 ~ file:", file)
    let errors = {  format: '', maxSize: ''}

    const fileSize = file.size
    console.log("🚀 ~ file: errors.midddleware.js:6 ~ fileSize:", fileSize)
    const fileType = file.type
    console.log("🚀 ~ file: errors.midddleware.js:8 ~ fileType:", fileType)

    if(fileType !== "image/jpg" && fileType !== "image/jpeg" && fileType !== "image/png") {
        console.log("invalid file");
        errors.format = "invalid file"
    } 
    if(fileSize > 5000) {
        errors.maxSize = "the file uploaded over 500ko"
    }

    return errors

    // console.log("🚀 ~ file: errors.utils.js:46 ~ err:", err)

    // if(err.message.includes('invalid file'))
    // errors.format = "Incompatible format";

    // if(err.message.includes('max size'))
    // errors.maxSize = "the file uploaded over 500ko";

    // return errors;
}


// if (
//     req.file.detectedMimeType != "image/jpg" &&
//     req.file.detectedMimeType != "image/png" &&
//     req.file.detectedMimeType != "image/jpeg"
//   )
//     throw Error("invalid file");

//   if (req.file.size > 500000) throw Error("max size");
