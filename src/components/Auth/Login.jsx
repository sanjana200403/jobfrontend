import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaPhoneFlip } from "react-icons/fa6";
import { FaPencilAlt, FaRegUser } from 'react-icons/fa'


const Login = () => {
  const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [role,setRole] = useState("")
    const [show,setShow] = useState(false)
  const {isAuthorized,setIsAuthorized,user,setUser} = useContext(Context)
  const navigate = useNavigate()
  const handleLogin = async(e)=>{
    e.preventDefault()
    try{
        const {data} = await axios.post("https://jobdemo.onrender.com/api/v1/user/login",{email,password,role},{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })
        navigate("/")
        console.log(data)
        toast.success(data.message)
        setEmail("")
        setPassword("")
      
    
        setRole("")
        setIsAuthorized(true)

    }catch(error){
        console.log("error in register",error)
        toast.error(error.response.data.message)
    }
  
    

    

}
if(isAuthorized){
  return <Navigate to={'/'}/>

}

  return (
    <div className='authPage'>
        <div className="container">
            <div className="header">
                <img src="https://www.shutterstock.com/image-vector/job-search-logo-260nw-347202311.jpg" alt="logo" />
                <h3>Login to your Account</h3>

            </div>
            <form action="">
                <div className="inputTag">
                    <label htmlFor="">
                        Login As
                    </label>
                    {/* role */}
                    <div>
                        <select value={role} onChange={(e)=>{setRole(e.target.value)}}>
                            <option value="">Select Role</option>
                            <option value="Employer">Employer</option>
                            <option value="Job Seeker">Job Seeker</option>

                        </select>
                        <FaRegUser/>
                    </div>
                  
                </div>
               
                {/* email */}
                <div className="inputTag">
                    <label htmlFor="">
                      Email address
                    </label>
                  
                    <div>
                       <input type="email" 
                       value={email}
                       placeholder='Enter your Email'
                       onChange={(e)=>{
                        setEmail(e.target.value)
                       }}
                       
                       />
                        <MdOutlineMailOutline/>
                    </div>
                  
                </div>
              
              
              
                {/* password */}
                <div className="inputTag">
                    <label htmlFor="">
                        Password
                    </label>
                   
                    <div>
                        <input type="password"
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        />
                      
                          
                        <FaPhoneFlip/>
                    </div>
                  
                </div>
                

                <button onClick={handleLogin} type='submit'>
                    Login
                </button>
                <Link to={'/register'}>Register Now</Link>
                
            </form>
        </div>
        <div className="banner">
            <img src="https://www.iimtstudies.edu.in/wp-content/uploads/2023/04/1627634337.png" alt="" />
        </div>
      
    </div>
  )
}

export default Login
