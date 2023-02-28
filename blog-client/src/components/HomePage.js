

import { AppBar, Avatar, Menu, MenuItem, Stack, Toolbar, Typography,Box, Button } from '@mui/material'
import React, { useState } from 'react'
import homeImage from '../assets/home.jpg'
import Allposts from './Allposts'
import Search from './Search'
import {NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Footer from './Footer'
const HomePage = () => {


  const [open,setOpen] = useState(false)
 const navigate = useNavigate()
  const logout =()=>{

    localStorage.removeItem('Token')
   navigate('/')
     
  }
  const openHandler = ()=>{
    setOpen(!open)
  }
  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            direction: "row",
          }}
        >
          <Stack spacing={2} direction="row">
            <Typography
              sx={{
                "&:hover": {
                  color: "pink",
                  boxShadow: "0px 2px 0px lightgray",
                },
                textDecoration: "none",
                 color:"white",
                cursor: "pointer",
              }}
              variant="h5"
              component={NavLink}
              to="/post"
            >
             Write Blog
            </Typography>
            <Typography
              sx={{
                "&:hover": {
                  color: "pink",
                  boxShadow: "0px 2px 0px lightgray",
                },
                cursor: "pointer",
                textDecoration: "none",
                color: "white",
              }}
              variant="h5"
              component={NavLink}
              to="/about"
            >
              About
            </Typography>
            <Typography
              sx={{
                "&:hover": {
                  color: "pink",
                  boxShadow: "0px 2px 0px lightgray",
                },
                cursor: "pointer",
                textDecoration: "none",
                color: "white",
              }}
              variant="h5"
              component={NavLink}
              to="/contact"
            >
              Contact
            </Typography>
            <Avatar onClick={openHandler} sx={{ cursor: "pointer" }} src="" />

            <Menu
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={() => setOpen(false)}
            >
              <MenuItem onClick={() => setOpen(!open)}>Account</MenuItem>
              <MenuItem onClick={() => setOpen(!open)}>setting</MenuItem>
              <MenuItem  onClick={logout}>Logtout</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box>
        <img
          src={homeImage}
          style={{ height: "500px", width: "100%",objectFit:"cover" }}
          alt="homescreen"
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Typography variant="h4">Search & Filter Blogs Post</Typography>
      
      </Box>
      {/* <Box>
        <Search />
      </Box> */}
      <Box sx={{display:"flex",justifyContent:"space-evenly", flexWrap: "wrap"}} >
        <Allposts />
      </Box>

      <Box sx={{bgcolor:"lightblue"}}>
        <Footer/>
      </Box>
    </>
  );
}

export default HomePage