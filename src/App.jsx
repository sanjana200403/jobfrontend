import React from 'react'
import './App.css'
import { Context } from './main'
import { useEffect,useContext } from 'react'
import {BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './components/Home/Home'
import {Toaster} from 'react-hot-toast'
import Job from './components/Job/Job'
import JobDetails from './components/Job/JobDetails'
import Application from './components/Application/Application'
import MyApplication from './components/Application/MyApplication'
import PostJob from './components/Job/PostJob'
import MyJobs from './components/Job/MyJobs'
import NotFound from './components/NotFound/NotFound'
import axios from 'axios'



const App = () => {
const {isAuthorized,setIsAuthorized,setUser,user} = useContext(Context)
useEffect(()=>{
  const fetchUser = async()=>{
    try{
      const response = await axios.get("https://jobdemo.onrender.com/api/v1/user/getuser",{withCredentials:true})
      console.log(response,"get user")
      setUser(response.data.user)
      setIsAuthorized(true)

    }catch(err){
      console.log("user is not auth ")
      setIsAuthorized(false)

    }

  }
  fetchUser()

},[isAuthorized])



  return (
    <>
     
      <Router>
        <Navbar/>
        <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} 
        />
        <Route path='/' element={<Home/>} />
        <Route path='/job/getall' element={<Job/>} />
        <Route path='/job/:id' element={<JobDetails/>} />
        <Route path='/job/me' element={<MyJobs/>} />
        <Route path='/job/post' element={<PostJob/>} />
        <Route path='/application/:id' element={<Application/>} />
        <Route path='/application/me' element={<MyApplication/>} />
        <Route path='*' element={<NotFound/>} />

        </Routes>
        <Footer/>
        <Toaster/>
          
      </Router>

    </>
  )
}

export default App
