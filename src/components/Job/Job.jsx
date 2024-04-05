import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Job = () => {
  const [jobs,setJobs] = useState([])
  const {isAuthorized,setIsAuthorized,setUser} = useContext(Context)
  const navigate = useNavigate()
  useEffect(()=>{
    try{
       axios.get("https://jobdemo.onrender.com/api/v1/job/getall",{withCredentials:true}).then(res=>{
        console.log(res.data)
        setJobs(res.data)
       })

    }catch(error){
      console.log(error,"error in finding all jobs")

    }

  },[])
  if(!isAuthorized){
    navigate("/login")
  }

  return (
    <section className='jobs page'>
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {
            jobs.jobs && jobs.jobs.map((element)=>{
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );

            })
          }
        </div>
      </div>
      
    </section>
  )
}

export default Job
