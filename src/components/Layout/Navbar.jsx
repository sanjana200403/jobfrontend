import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {GiHamburgerMenu} from 'react-icons/gi'

const Navbar = () => {
    const [show,setShow] = useState(false)
    const {isAuthorized,setIsAuthorized,user} = useContext(Context)
    const navigate = useNavigate()
    const handleLogout = async()=>{
        try{
            const response = await axios.get("https://jobdemo.onrender.com/api/v1/user/logout",{withCredentials:true})
            toast.success(response.data.message)
            
            setIsAuthorized(false)
            navigate("/login")

        }catch(error){
            toast.error(error.response.data.message)
           console.log("Error in logout",response)
           setIsAuthorized(true)
        }

    }
  return (
    <nav className={isAuthorized?'navbarShow':'navbarHide'}>
        <div className="container">
            <div className="logo">
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ojCxeq8lMyrz3YuzGbRAD3zMPtsKdZeFRQ&usqp=CAU" alt="logo" /> */}
                <img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_b3ca0e8180f52cdf53b149d0f284ea23/hackajob.jpg" alt="logo" />

            </div>
            <ul className={!show?"menu":"show-menu menu"}>
                <li>
                    <Link to={"/"} onClick={()=>{
                        setShow(false)
                    }}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to={"/job/getall"} onClick={()=>{
                        setShow(false)
                    }}>
                        ALL JOBS
                    </Link>
                </li>
                <li>
                    <Link to={`/application/me`} onClick={()=>{
                        setShow(false)
                    }}>
                     {
                        user && user.role=="Employer"?"APPLICANT'S APPLICATION":"MY APPLICATION"
                     }
                    </Link>
                </li>
                {
                    user && user.role ==="Employer" ? (
                        <>
                        <li>
                            <Link to={`/job/post`}
                            onClick={()=>{
                                setShow(true)
                            }}
                            >
                                POST NEW JOB
                            </Link>
                        </li>
                        <li>
                            <Link to={'/job/me'}
                            onClick={()=>{setShow(false)}}
                            >
                                VIEW YOUR JOB

                            </Link>
                        </li>
                        </>
                    ):(<></>)
                }
                <button onClick={handleLogout}>LOGOUT</button>
            </ul>
            <div className="hamburger">
                <GiHamburgerMenu onClick={()=>setShow(!show)}/>

            </div>

        </div>
       
    </nav>
  )
}

export default Navbar
