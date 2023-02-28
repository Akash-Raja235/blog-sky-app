
import {
  Box,
  Button,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const UpdatePost = () => {
  const [input, setInput] = useState({
    category: "",
    title: "",
    discription: "",
    image: "",
  });


  const {id} = useParams()


  const navigate = useNavigate();
  const [storePost, setStorePost] = useState([]);
  const [getPost, setGetPost] = useState([])

  const [saveToken, setshaveToken] = useState();

  const getToken = localStorage.getItem("Token");
  useEffect(() => {
    const token = localStorage.getItem("Token");
    setshaveToken(token);
  }, [saveToken]);

  
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const imgaeHandler = (e) => {
    const img = e.target.files[0];
     
      setInput({ ...input, image: img });
    
      
  
    // setFile(URL.createObjectURL(img.name));
  };
// getting data from Api
  const getSinglePost = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/post/${id}`,
      {
        headers: { authorization: `Bearer ${getToken}` },
      }
    );

    setInput(data.post);
  };
  useEffect(() => {
    getSinglePost();
  }, []);

  const eventHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

     if(input.image.name){
      formData.append("image", input.image, input.image.name);
     }
      
  
    
    formData.append("title", input.title);
  
    formData.append("discription", input.discription);

    try {
      
      const { data } = await axios.patch(
        `http://localhost:5000/api/v1/post/${id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${getToken}`,
          },
        }
      );

      setStorePost(data.post);
      
    } catch (error) {
      console.log(error.message)
    }
  };

  const imagevref = URL.revokeObjectURL(input.image)
  console.log(imagevref);
 
  return (
    <>
      <Box sx={{ mt: 2, ml: "500px", width: "500px" }}>
        <Stack
          component="form"
          onSubmit={eventHandler}
          encType="multipart/form-data"
        >
          <Typography variant="h5"> Update Post</Typography>

          <img
            src={
              input.image
                ? URL.createObjectURL(input.image)
                :""
            }
            alt="hhh"
          />
          <InputLabel htmlFor="inputfile">
            <AddCircleIcon fontSize="large" />
          </InputLabel>

          <TextField
            onChange={imgaeHandler}
            name="image"
            type="file"
            id="inputfile"
            accept="image/*"
            files={input.image}
            sx={{ display: "none" }}
          />
          <TextField
            onChange={inputHandler}
            name="title"
            variant="outlined"
            type="text"
            placeholder="Write Title here"
            value={input.title}
          />
          <TextField
            onChange={inputHandler}
            name="discription"
            variant="outlined"
            type="text"
            placeholder="Write Your Discription here"
            multiline
            rows={4}
            value={input.discription}
          />
          <Button type="submit" variant="contained">
            Update Post
          </Button>
        </Stack>
      </Box>
      <Box sx={{ mt: 2, ml: "500px", width: "500px" }}>
        <Button
          component={NavLink}
          to={
            storePost._id
              ? `/post/details/${storePost._id}`
              : `/post/details/${input._id}`
          }
        >
          GO to article area
        </Button>
      </Box>
    </>
  );
};

export default UpdatePost;