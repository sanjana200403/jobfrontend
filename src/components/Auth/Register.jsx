import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaPhoneFlip } from "react-icons/fa6";
import { FaPencilAlt, FaRegUser } from 'react-icons/fa'

const Register = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [role,setRole] = useState("")
    const [name,setName] = useState("")
    // const navigate = useNavigate()
    const {isAuthorized,setIsAuthorized,user} = useContext(Context)
    const handleRegister = async(e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.post("https://jobdemo.onrender.com/api/v1/user/register",{email,password,phone,role,name},{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            })
            console.log(data)
            toast.success(data.message)
            setEmail("")
            setPassword("")
            setPassword("")
            setPhone("")
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
                <h3>Create a new account</h3>

            </div>
            <form action="">
                <div className="inputTag">
                    <label htmlFor="">
                        Register As
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
                {/* name */}
                <div className="inputTag">
                    <label htmlFor="">
                    Name
                    </label>
                  
                    <div>
                     <input type="text" 
                     value={name}
                     placeholder='Enter your name'
                     onChange={(e)=>setName(e.target.value)}
                     />
                        <FaPencilAlt/>
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
                {/* phone */}
                <div className="inputTag">
                    <label htmlFor="">
                        Phone Number
                    </label>
                    {/* role */}
                    <div>
                        <input type="number"
                        placeholder='Enter your Number'
                        value={phone}
                        onChange={(e)=>{
                            setPhone(e.target.value)
                        }}
                        />
                      
                          
                        <FaPhoneFlip/>
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
                

                <button onClick={handleRegister} type='submit'>
                    Register
                </button>
                <Link to={'/login'}>Login Now</Link>
                
            </form>
        </div>
        <div className="banner">
            <img src="https://www.iimtstudies.edu.in/wp-content/uploads/2023/04/1627634337.png" alt="" />
        </div>
      
    </div>
  )
}

export default Register
