import express from 'express'
import multer from 'multer'
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPost,
} from "../controllers/postController.js";
const router = express()


// router.post("/", createPost);
// router.get('/',getAllPost)
// router.get("/:id", getPost);




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), createPost)
router.get("/", getAllPost);
router.get('/:id',getPost)
router.patch('/:id',upload.single('image'),updatePost)
router.delete('/:id',deletePost)




export default router