import express from "express";
import path from "path";
import multer from "multer";

export const router = express.Router();

// class FileMiddleware {
//   filename = "";
//   //Attribute diskloader
//   // Crete object of diskloader for saving file
//   public readonly diskLoader = multer({
//     //storage = define folder to be saved
//     storage: multer.diskStorage({
//         // destination = saving folder
//       destination: (_req, _file, cb) => {
//         cb(null, path.join(__dirname, "../uploads"));
//       },
//       // filename = random unique name
//       filename: (req, file, cb) => {
//         const uniqueSuffix =
//           Date.now() + "-" + Math.round(Math.random() * 10000);
//           //filename will be unique
//         this.filename = uniqueSuffix + "." + file.originalname.split(".").pop();
//         cb(null, this.filename);
//       },
//     }),
//     //limit file size
//     limits: {
//       fileSize: 67108864, // 64 MByte
//     },
//   });
// }

// const fileUpload = new FileMiddleware();
// router.post("/", fileUpload.diskLoader.single("file"), (req, res) => {
//   res.json({ filename: "้/uploads/" + fileUpload.filename });
// });

//1. Connect Firebase
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAauQJA5yb7EMinh9viCQRyl-ZrFS25IXU",
    authDomain: "web-triptest.firebaseapp.com",
    projectId: "web-triptest",
    storageBucket: "web-triptest.appspot.com",
    messagingSenderId: "862950859821",
    appId: "1:862950859821:web:14781637d1715f7aa784a4",
    measurementId: "G-SRHBT69M2S"
  };

  initializeApp(firebaseConfig);
  const storage = getStorage();


// GET /upload
router.get("/", (req, res)=>{
    res.send("Method GET in upload.ts");
})

class FileMiddleware {
    filename = "";
    //Attribute diskloader
    // Crete object of diskloader for saving file
    public readonly diskLoader = multer({
      //storage = define folder to be saved
      storage: multer.memoryStorage(),
      //limit file size
      limits: {
        fileSize: 67108864, // 64 MByte
      },
    });
  }
  
  const fileUpload = new FileMiddleware();
    //2. Upload file to Firebase storage
    //Generate filename
  router.post("/", fileUpload.diskLoader.single("file"), async (req, res) => {
    const filename = Date.now() + "-" + Math.round(Math.random() * 10000)+ ".png";
    const storageRef = ref(storage, "/images/"+ filename);
    const metadata = {
        contentType : req.file!.mimetype
    }
    //upload
    const snapshot = await uploadBytesResumable(storageRef, req.file!.buffer, metadata);

    // res.json({ filename: "้/uploads/" + fileUpload.filename });
    //return
    const url = await getDownloadURL(snapshot.ref);
    res.status(200).json({
        file : url
    });
  });