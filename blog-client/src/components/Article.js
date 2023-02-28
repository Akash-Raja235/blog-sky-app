
import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useParams } from 'react-router-dom'
const Article = () => {

  
    const {id} = useParams()
   const [data,setData] = useState([])
   
const getPosts = async()=>{
const { data } = await axios.get(`http://localhost:5000/api/v1/post/${id}`);
   setData(data.post) 
}
const deleteEvent = async () => {
  await axios.delete(`http://localhost:5000/api/v1/post/${id}`);
};
  useEffect(() => {
    getPosts();
  }, [deleteEvent, getPosts]);



 
  return (
    <Box sx={{ border: "1px solid gray", width: "400px" }}>
      {setData.length > 0 && (
        <>
          <Stack spacing={1}>
            <img
              src={`http://localhost:5000/public/images/${data.image}`}
              style={{ width: "400px", height: "300px" }}
              alt="image"
            />
            <Typography variant="h4">{data.title}</Typography>

            <Typography variant="subtitle">{data.discription}</Typography>
            <Button  component ={NavLink} to ={`/post/update/${data._id}`}  >Update</Button>
            <Button onClick={deleteEvent}>delete</Button>
          </Stack>
        </>
      )}
    </Box>
  );
}

export default Article