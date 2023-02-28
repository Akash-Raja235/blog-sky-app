import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Posts = () => {

const [input, setInput] = useState({
     category:"",
     title:"",
     discription:"",
     image:""
})

const [file, setFile] = useState('')

const navigate = useNavigate()
const [storePost, setStorePost] = useState([])
const [is ,setIs] = useState(false)


const [saveToken, setshaveToken] = useState()
useEffect(() => {
  const token = localStorage.getItem("Token");
  setshaveToken(token);
}, [saveToken]);



const inputHandler =(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
}
 const imgaeHandler = (e) => {
   const img = e.target.files[0];
   setInput({ ...input, image: img });
   // setFile(URL.createObjectURL(img.name));
 };




const eventHandler = async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('image',input.image,input.image.name)
   formData.append('title',input.title)
   formData.append('category',input.category)
   formData.append('discription',input.discription)
  
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/post",
      formData,
      {
        headers: {
          authorization: `Bearer ${saveToken}`,
        },
      }
    );


setStorePost(data.post);

setIs(true)
navigate('/home')

}

const ulr =
  "http://cdn2.hubspot.net/hub/53/file-23115630-jpg/blog/images/blogging_image.jpg";

  return (
    <>
      <Box sx={{ mt: 2, ml: "500px", width: "500px" }}>
        <Stack
          component="form"
          onSubmit={eventHandler}
          encType="multipart/form-data"
        >
          <Typography variant="h5">Create Post</Typography>

          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Select blog Categories
            </InputLabel>
            <Select
              label="Select blog Categories"
              onChange={inputHandler}
              name="category"
            >
              {/* <MenuItem value={"All"}>All </MenuItem> */}
              <MenuItem value={"Movies"}>Movies</MenuItem>
              <MenuItem value={"Sports"}>Sports</MenuItem>
              <MenuItem value={"News"}>News</MenuItem>
              <MenuItem value={"Music"}>Music</MenuItem>
            </Select>
          </FormControl>
          <img src={input.image? URL.createObjectURL(input.image): ulr} alt="hhh" />
          <InputLabel htmlFor="inputfile">
            <AddCircleIcon fontSize="large" />
          </InputLabel>

          <TextField
            onChange={imgaeHandler}
         
            name="image"
            type="file"
            id="inputfile"
            accept="image/*"
            sx={{ display: "none" }}
          />
          <TextField
            onChange={inputHandler}
            name="title"
            variant="outlined"
            type="text"
            placeholder="Write Title here"
          />
          <TextField
            onChange={inputHandler}
            name="discription"
            variant="outlined"
            type="text"
            placeholder="Write Your Discription here"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained">
            Create Post
          </Button>
        </Stack>
      </Box>
      <Box sx={{ mt: 2, ml: "500px", width: "500px" }}>
        {is ? (
          <Button component={NavLink} to={`/post/artical/${storePost._id}`}>
            GO to article area
          </Button>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default Posts