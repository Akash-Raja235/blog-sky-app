

import { Grid, Typography,Paper, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams,Link } from 'react-router-dom'
import { Category } from "../assets/Data";

const saveToken = localStorage.getItem('Token')
const Allposts = () => {
  const [blog, setBlog] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [Catdata, setCatData] = useState("");

  const [searchParam] = useSearchParams();
  console.log(searchParam);
  const path = searchParam.get("category");
  console.log(path);

  const API_URL = "http://localhost:5000/api/v1/post";

  const getAllPost = async () => {
    const { data } = await axios.get(
      API_URL,

      {
        headers: {
          authorization: `Bearer ${saveToken}`,
        },
      }
    );
    setBlog(data.posts);
    setSearchData(data.posts);
  };

    const getPostBtcat = async(e)=>{
    
     if(e.target.value ==''){
      setSearchData(SearchData);
     }else{
     const filteredData = SearchData.filter((item)=>item.category.toLowerCase().includes(e.target.value.toLowerCase()))

     setBlog(filteredData)
     }
     if(e.target.value == 'All'){
      setSearchData(SearchData);
     }

     setCatData(e.target.value)
      }
  



  useEffect(() => {
    getAllPost();
  }, []);
  

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 400 }}>
        <InputLabel> All post</InputLabel>
        <Select onChange={getPostBtcat} value={Catdata}>
          {Category.map((categoryItem) => {
            return (
              <MenuItem
                component={Link}
                to={`/home/search?category=${path}`}
                key={categoryItem}
                value={categoryItem}
              >
                {categoryItem}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {blog.map((post) => {
        if (typeof post.createdBy != "undefined")
          return (
            <Paper
              component={NavLink}
              to={`/post/details/${post._id}`}
              key={post._id}
              sx={{
                m: 2,
                p: 1,
                cursor: "pointer",
                transition: "transform .2s",
                width: "300px",
                textDecoration: "none",
                "&:hover": { opacity: "60%", transform: "scale(1.1) " },
              }}
            >
              <img
                src={`http://localhost:5000/public/images/${post.image}`}
                alt="ima"
                style={{
                  width: "300px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Typography variant="h5">{post.title}</Typography>

              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                  wordWrap: "break-word",
                  maxHeight: "3.6em",
                  lineHeight: "1.8em",
                }}
                variant="subtitle"
              >
                {post.discription}
              </Typography>

              <Typography
                sx={{ pt: 1, color: "lightblue", textAlign: "center" }}
                variant="body2"
              >
                {post.category}
              </Typography>
              <Typography
                sx={{ fontStyle: "italic", textAlign: "center" }}
                variant="body2"
              >
                ~ {post.createdBy.name}
              </Typography>
            </Paper>
          );
      })}
    </>
  );
}

export default Allposts