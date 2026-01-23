import multer from "multer";

const storage = multer.diskStorage({
    destination: "public/image/";
    filename: (req, file, callbackFun) => {
        const uniqueName = `${Date.now()} - ${file.originalname}`;
        callbackFun(null, uniqueName);
    }
});

const upload = multer({storage});

export default upload;