import React, { useEffect, useState } from 'react'
import {Stack,Button, TextField,Typography} from '@mui/material'
import logo from '../../assets/blog-logo.png'
import axios from 'axios'
import Alert from "@mui/material/Alert";
import {signupApi} from '../../service/api'
import { useNavigate } from 'react-router-dom';

import { useSelector,useDispatch } from 'react-redux';
import {toast} from 'react-toastify'
import { Asyncregister,reset } from '../../redux/authSclice';
 export const userData = {};
const Login = () => {
 const [SignedUp, setSignedUp] = useState(false);
  const [loginToggle, setLoginToggle] = useState('login')
  const [signup, setSignup] = useState({
    name: "",
    username: "",
    password: "",
  });
  
const nagivate = useNavigate();
// const dispatch  = useDispatch()
// const {user,isLoading, isError, isSuccess,message} = useSelector((state)=>state.auth)

  const [loginData, setLoginData] = useState({
   username: "",
   password: "",
 });
 
 const [saveData, setShaveData] = useState(userData);
  const inputChange =(e)=>{
   setSignup({...signup, [e.target.name]: e.target.value})
  
  }
  const inputHandler =(e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value})
  }

    // useEffect(()=>{

    //   if(isError){
    //     toast.error(message)
    //   }
    //   if(isSuccess || user){
    //     setLoginToggle("login");
    //   }
    //   dispatch(reset())
    // },[user,isError,isSuccess,message,nagivate,dispatch])
  const signupUser = async ()=>{
      try {
        const {data} = await axios.post("http://localhost:5000/api/v1/signup",signup)

         console.log(data);
         setLoginData(data.user)
      setSignedUp(true)
      setLoginToggle("login");
      } catch (error) {
        console.log(error.message);
      }
   
      //  dispatch(Asyncregister(signup));
  }

const loginUser = async(e)=>{
  e.preventDefault()

try {
  
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/login",
      loginData
    );
    setShaveData(data)
    localStorage.setItem("Token", data.refreshToken);
   nagivate('/home')
    
} catch (error) {
  console.log(error.message)
}

}


  return (
    <>
      {loginToggle === "login" ? (
        <Stack
          spacing={4}
          sx={{
            boxShadow: "2px 5px 2px 5px whitesmoke",
            width: "500px",
            p: 3,
            m: "auto",
            border: "1px solid lightgray",
          }}
        >
          <img
            style={{
              width: "200px",
              height: "150px",
              alignItems: "center",
              paddingLeft: "150px",
            }}
            src={logo}
            alt=""
          />
          <TextField onChange={inputHandler} name="username"  placeholder="username" variant="standard" />
          <TextField onChange={inputHandler} name="password" placeholder="password" variant="standard" />
          <Button onClick={loginUser} variant="contained">Login</Button>
          <Typography sx={{ textAlign: "center" }} variant="h6">
            OR
          </Typography>
          <Button onClick={() => setLoginToggle(!"login")} variant="outlined">
            create an account
          </Button>
        </Stack>
      ) : (
        <>
          <Stack
            spacing={4}
            sx={{
              boxShadow: "2px 5px 2px 5px whitesmoke",
              width: "500px",
              p: 3,
              m: "auto",
              border: "1px solid lightgray",
            }}
          >
            <img
              style={{
                width: "200px",
                height: "150px",
                alignItems: "center",
                paddingLeft: "150px",
              }}
              src={logo}
              alt=""
            />
            {(SignedUp===true)?  <Alert severity="success">you created account successfully!</Alert>: ''}
            <TextField onChange={(e)=> inputChange(e)} name="name" placeholder="Name" variant="standard" />
            <TextField onChange={(e)=> inputChange(e)} name ="username" placeholder="username" variant="standard" />
            <TextField onChange={(e)=> inputChange(e)}  name= "password" placeholder="password" variant="standard" />
            <Button onClick={signupUser} variant="contained">Sign Up</Button>
            <Typography sx={{ textAlign: "center" }} variant="h6">
              OR
            </Typography>
            <Button variant="outlined" onClick={() => setLoginToggle("login")}>
              Already Have a Account?
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}

export default Login