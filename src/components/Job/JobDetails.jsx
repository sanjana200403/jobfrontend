import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom'
import { Context } from '../../main'
import axios from 'axios'

const JobDetails = () => {
  const [job,setJob] = useState({})
  const {id} = useParams()
  console.log("job id ",id)
  const navigate = useNavigate()
  const {isAuthorized,setIsAuthorized,setUser,user} = useContext(Context)
  useEffect(()=>{
    axios.get(`https://jobdemo.onrender.com/api/v1/job/${id}`,{withCredentials:true}).then((res)=>{
      console.log("get single job!!",res.data)
      setJob(res.data.job)
    }).catch(err=>{
      console.log("error in getting single job",err,err.response.data.message)

    })

  },[])
  if(!isAuthorized){
    navigate("/login")
  }

  return (

    <>
    <div className="jobDetail page">
      <div className="container">
        <h1>Job Details</h1>
        <div className="banner">
          <p>
            Title : <span>{job.title}</span>
          </p>
          <p>
            Category : <span>{job.category}</span>
          </p>
          <p>
            Country : <span>{job.country}</span>
          </p>
          <p>
            City : <span>{job.city}</span>
          </p>
          <p>
            Description : <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          {/* <p>
            salary : {job.fixedSalary ? (<span>{job.fixedSalary}</span>):(<span>{job.salaryFrom}</span>-<span>{job.salaryTo}</span>)} 
          </p> */}
          <p>salary : {job.fixedSalary?(<span>{job.fixedSalary}</span>):(<span>
{job.salaryFrom }-{job.salaryTo}
          </span>)}</p>
          <p>
            {
              user && user.role === "Employer" ? 
              <>
              
              </> : <Link to={`/application/${job._id}`}>Apply Now</Link>
            }
          </p>
        </div>

      </div>

    </div>
      
    </>
  )
}

export default JobDetails
