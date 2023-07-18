import cloudinary from "./cloudinary";
import fs from "fs";
import multer, { FileFilterCallback, StorageEngine } from "multer";
import { Request } from "express"
import { v4 as uuidv4 } from "uuid";
import { logError } from "./logging";
import { AuthRequest } from "../middleware/authMiddleware";

interface File {
    originalname: string,
    mimetype: string
}


const generateFilename = (length: number, filename: string): string => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456790";
    let newFilename = "";
    let charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
        // Let the new filename be the value of the index of the floored (rounded down) math.random function which returns a number between 0 and 1 and multiplies it by the length of our charset string
        newFilename += charset.charAt(Math.floor(Math.random() * charsetLength))
    }

    // const value = `${newFilename}-${filename}`;
    const value = newFilename + '-' + filename;
    return value;
}

const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')   //To make the image accessible even while on localhost
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, generateFilename(20, fileName))
    }
})

const fileFilter = (req: AuthRequest, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf', 'image/gif'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {

        const error: any = new Error("Invalid file type. Only JPEG, PNG, and PDF files are allowed.");

        error.error = "Invalid file type";
        error.status = 400;
        cb(error, false);
        // return cb(error, false);
    }

}
// var upload = multer({storage: storage});
var upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        // fileSize: 1024 * 1024 * 1,  //1mb
        fileSize: 1024 * 1024 * 5,  //5mb
        // files: 5    //Maximum of 5 files
    },
    // boundary: v4()
});

const deleteLocally = (localFilePath: string) => {
    // console.log("localFilePath")
    // console.log(localFilePath)
    // fs.unlinkSync(localFilePath) //Use when using localhost and to remove actual images

    fs.unlink(localFilePath, (err) => {
        if (err) {
            // console.log("ERRR")
            return [false, `Failed to remove file locally \nError: ${err}`]
        } else {
            // console.log("YYYY")
            return [true, "File was deleted successfully."]
        }
    })
}

async function deleteFromCloudinary(publicId: string) {
    let delImage = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted image", delImage);
    return delImage;
}

async function uploadProfilePicToCloudinary(localFilePath: string) {

    console.log(localFilePath);
    try {
        const result = await cloudinary.uploader.upload(localFilePath, { folder: 'Ngo-Tech-Project-Explorer/ProfilePictures' });
        // Image has been successfully uploaded to Cloudinary, so we don't need the local image file anymore
        fs.unlinkSync(localFilePath);

        return {
            message: "Success, Profile Picture uploaded",
            url: result.secure_url,
            details: result,
            publicId: result.public_id

        };

    } catch (error:any) {
        // Remove file from local uploads or api/uploads folder
        fs.unlinkSync(localFilePath);
        logError("Error from uploadProfilePic method util", error);
        return { message: 'Failed to upload profile picture to cloudinary', error: error.message}
    }

}


async function updateProfilePic(publicId: string, localFilePath: string) {

    try {
        await deleteFromCloudinary(publicId);
        const result = await uploadProfilePicToCloudinary(localFilePath);
        if (result.message !== "Fail") {
            return {
                message: "Profile Picture updated successfully",
                url: result.url,
                publicId: result.publicId,
                details: result.details
            }
        } else {
            return {
                message: "Failed to update image.",
                error: result.message
            }
        }

    } catch (error) {
        logError("Error from updateProfilePic method util", error);
        return { message: 'Failed to update image.', error}

    }

}
// async function updateProfilePic(publicId: string, localFilePath : string) {
//     return await deleteFromCloudinary(publicId)
//         .then(async () => {
//             let result = await uploadProfilePicToCloudinary(localFilePath);
//             // console.log("Updated image ", result);
//             if (result.message !== "Fail") {
//                 return {
//                     message: "Profile Picture updated successfully",
//                     url: result.url,
//                     publicId: result.publicId,
//                     details: result.details
//                 }
//             } else {
//                 return {
//                     message: "Failed to update image.",
//                     error: result.message
//                 }
//             }
//         })

// }


export {
    upload,
    deleteLocally,
    uploadProfilePicToCloudinary,
    updateProfilePic,
    deleteFromCloudinary,
    generateFilename

}