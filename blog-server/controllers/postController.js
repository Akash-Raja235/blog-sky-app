
import Post from '../models/Post.js'



// const createPost = async(req,res)=>{

//     const {title,discription,image} = req.body
     
//        const createdBy = req.user.userId 
//        console.log(req.userData);
       
//     if(!title || !discription){
//         return res.status(400).json({message:"title and discription are required"})
//     }

//     try {
//         const post = await Post.create({
//           title: title,
//           discription: discription,
//           image: image,
//           createdBy: createdBy,
//         });
//         return res.status(201).json({ message: "Post are Created", post });
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }

// }

// const getAllPost = async(req,res)=>{

//     try {
//         const posts = await Post.find({creatrdBy:req.user.userId})
//         if(!posts){
//             return res.status(400).json({message:"user has no post yet"})
//         }
//         return res.status(200).json({message:"get All pots",posts})
//     } catch (error) {
//           res.status(500).json({message:error.message})
//     }
// }

// const getPost = async(req,res)=>{
//     const {id}=req.params
//     // const {userId}=req.user
//     console.log(req);

//     try {
//         const post = await Post.find(id)
//     } catch (error) {
        
//     }
// }



// export {createPost,getAllPost,getPost}




const createPost = async (req, res) => {
  const { title, discription,category } = req.body;
  // req.body.createdBy = req.user.userId
  // console.log(req.user);
  const createdBy = req.user._id
  

  const image  = req.file.filename;

 
  if (!title || !discription) {
    return res.status(400).json({ message: "All field are required" });
  }

  try {
    const post = await Post.create({
      title: title,
      discription: discription,
      image: image, 
      category:category,
      createdBy: createdBy,
    });

    return res.status(201).json({ message: "pos has been created" ,post});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const {title,discription} = req.body
  const image = req.file.filename
  try {
    const post = await Post.findOneAndUpdate( id, {title:title,discription:discription,image:image}, {
      new: true,
      runValidator: true,
    });
    if (!post) {
      return res.status(400).json({ message: "You can't update this post" });
    }
    return res.status(200).json({ message: "pos has been updated", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOneAndDelete({ _id: id });
    if (!post) {
      return res.status(400).json({ message: "post not found" });
    }
    return res.status(200).json({ message: "pos has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

const getPost =async(req,res)=>{
const {id} = req.params


try {
   const  post = await Post.findOne({_id:id}).populate("createdBy") 
    if (!post) {
      return res.status(400).json({ message: "You can't  found  this post" });
    }
     return res.status(200).json({ message: "pos got",post });
} catch (error) {
    res.status(500).json({ message: error.message });
}
}

const getAllPost = async(req,res)=>{

  try {
    const posts = await Post.find({}).populate("createdBy");
    return res.status(200).json({ message: "You got All  post",posts });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getPostByCat = async()=>{

    const  {category} = req.body
  try {
    const posts = await Post.find({category:category}).populate("createdBy");
    return res.status(200).json({ message: "You got All  post",posts });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export {createPost,updatePost,deletePost,getPost,getAllPost}