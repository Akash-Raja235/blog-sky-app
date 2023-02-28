

import { Typography,Stack, Button, Tooltip } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
const DetailPost = () => {


    const [getPost,setGetpost] = useState([])
    const nagivate = useNavigate()
    const token = localStorage.getItem('Token')
    const {id} = useParams()
   

    const getSinglePost =async()=>{

        const { data } = await axios.get(
          `http://localhost:5000/api/v1/post/${id}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );

        setGetpost(data.post)

    }
    useEffect(() => {
        getSinglePost()
    }, []);

   const dedeleteHandler = async()=>{
    
    try {
      
      await axios.delete(`http://localhost:5000/api/v1/post/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      nagivate("/home");
    } catch (error) {
      console.log(error.message)
    }

   }
  return (
    <>
      <Stack direction={"row"} justifyContent="flex-end">
        <Tooltip title="Edit">
          <IconButton  component={NavLink} to={`/post/update/${getPost._id}`} color="secondary">
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton sx={{ color: "red" }} onClick = {dedeleteHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 1, ml: 20, mr: 20 }}
      >
        <Typography fontStyle="italic" variant="body2">
          Date: {getPost.createdAt}
        </Typography>
        <img
          src={`http://localhost:5000/public/images/${getPost.image}`}
          style={{ width: "100%", marginTop: "10px", objectFit: "cover" }}
          alt=""
        />

        <Typography sx={{ fontStyle: "bold", mt: 1 }} variant="h4">
          {getPost.title}
        </Typography>
        <Typography fontSize="20px">{getPost.discription}</Typography>
        <Typography
          sx={{ pt: 1, color: "lightblue", textAlign: "center" }}
          variant="body2"
        >
          {getPost.category}
        </Typography>
        {typeof getPost.createdBy != "undefined" && (
          <Typography
            sx={{ fontStyle: "italic", textAlign: "center" }}
            variant="body2"
          >
            ~ {getPost.createdBy.name}
          </Typography>
        )}
      </Stack>
      <Stack
        sx={{
          display: "flex",
          ml: "1000px",
          justifyContent: "flex-end",
          mb: "100px",
        }}
      >
        <Button
          component={NavLink}
          to="/home"
          variant="outlined"
          color="secondary"
        >
          Go to Home
        </Button>
      </Stack>
    </>
  );
}

export default DetailPost