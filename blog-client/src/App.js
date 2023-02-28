
import './App.css';
import Login from './components/account/Login';
import Posts from './components/Posts';
import React from 'react'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Article from './components/Article';
import UpdatePost from './components/UpdatePost';
import HomePage from './components/HomePage';
import DetailPost from './components/DetailPost';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/post" element={<Posts />} />
          <Route path="/post/artical/:id" element={<Article />} />
          <Route path="/post/details/:id" element={<DetailPost />} />
          <Route path="/post/update/:id" element={<UpdatePost />} />
          <Route path="/home/*" element={<HomePage />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </>
  );
}

export default App
