import React, { useContext, useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyJobs = () => {
  const [myJobs,setMyJobs] = useState([])
  const [editingMode,setEditingMode] = useState(null)
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate()
  // fetching all job of an employer
  useEffect(()=>{
    const fetchJob = async()=>{
      console.log("myjob hello")
      try{
      const {data} =  await axios.get("https://jobdemo.onrender.com/api/v1/job/getmyjobs",{withCredentials:true})
      setMyJobs(data.myJobs)
      console.log(data,"get all my jobs!!")
      

      }catch(error){
        console.log("error in getting all my jobs")
        toast.error(error.response.data.message)
        setMyJobs([])

      }
    
      

    }
    fetchJob()
   
    

  },[])
  if(!isAuthorized || ( user && user.role !== "Employer")) {
    navigate("/")

  }
  // Function for Enable Editing Mode
  const handleEnableEdit = (jobId)=>{
    setEditingMode(jobId)

   
    
  }
  // Function for disabling Editing Mode
  const handleDisableEdit = ()=>{
    setEditingMode(null)
      
  }
  // function for Editing job
  const handleUpdateJob =async(jobId)=>{
    const updatedJob = myJobs.find((job)=>job._id === jobId)
    await axios.put(`http://localhost:4000/api/v1/job/update/${jobId}`,updatedJob,{
      withCredentials:true
    })
    .then((res)=>{
      console.log(res,"update job")
      toast.success(res.data.message)
      setEditingMode(null)

    }).catch((error=>{
      console.log("error")
      toast.error(error.response.data.message)

    }))
     
    
    

  }
  // delete job
  const handleJobDelete = async(jobId)=>{
    await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`,{withCredentials:true}).then(res=>{
      console.log(res)
      toast.success(res.data.message)
    
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
 
    }).catch(error=>{
      console.log(error)
      toast.error(error.message.data.message)
    })

  }
  // handle input change
  const handleInputChange =(jobId,field,value)=>{
    setMyJobs(prevJobs =>
      prevJobs.map(job=>
        job._id === jobId ? {...job,[field]:value
      }:job
    )

    )

  }

 
  

  return (
    <div className='myJobs page'>
      <div className="container">
        <h3>Your Posted Job</h3>
        { myJobs &&
          myJobs.length>0 ?(
          <>
          <div className="banner">
           {myJobs.map((element)=>{
            return(
              <div className="card" key={element._id}>
                <div className="content">
                  <div className="short_fields">
                  
                    <div>
                      <span>
                        Title:
                      </span>
                      <input type="text"
                       disabled={editingMode !== element._id?true:false} 
                      value={element.title}
                      onChange={(e)=>{handleInputChange(element._id,"title",e.target.value)}}
                      />

                    </div>
                
                
                  {/*   ======= */}
                  <div>
                      <span>
                        Country:
                      </span>
                      <input type="text" disabled={editingMode !== element._id?true:false} 
                      value={element.country}
                      onChange={(e)=>{handleInputChange(element._id,"country",e.target.value)}}
                      />

                    </div>
                    {/* city */}
                    <div>
                      <span>
                        City:
                      </span>
                      <input type="text" disabled={editingMode !== element._id?true:false} 
                      value={element.city}
                      onChange={(e)=>{handleInputChange(element._id,"city",e.target.value)}}
                      />

                    </div>
                    {/* category */}
                    <div>
                      <span>
                        Category:
                      </span>
                   <select value={element.category}
                    onChange={(e)=>{handleInputChange(element._id,"category",e.target.value)}}
                    disabled={
                      editingMode !==element._id ? true:false
                    }
                    >
                      <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>

                   </select>

                    </div>
                    {/* salary */}
                    <div>
                      <span>Salary:{element.fixedSalary ?
                      <input type='Number'
                      disabled={editingMode !== element._id?true:false} 
                      value={element.fixedSalary}
                      onChange={(e)=>{handleInputChange(element._id,"fixedSalary",e.target.value)}}>
                      </input>:
                      <div>
                         <input type='Number'
                      disabled={editingMode !== element._id?true:false} 
                      value={element.salaryFrom}
                      onChange={(e)=>{handleInputChange(element._id,"salaryFrom",e.target.value)}}>
                      </input>
                       <input type='Number'
                      disabled={editingMode !== element._id?true:false} 
                      value={element.salaryTo}
                      onChange={(e)=>{handleInputChange(element._id,"salaryTo",e.target.value)}}>
                      </input>
                      
                      </div>}
                      </span>
                    </div>
                    {/* expire */}
                    <div>
                      <span>
                        Expire:
                      </span>
                     <select 
                     value={element.expired}
                     onChange={(e)=>{handleInputChange(element._id,"expired",e.target.value)}}
                     disabled={
                       editingMode !==element._id ? true:false
                     }
                     >
                      <option value={true}>
                          TRUE
                      </option>
                      <option value={false}>
                        FALSE
                        </option>

                     </select>

                    </div>
                    </div>
                    {/*  */}

<div className="long_field">
  <div>
    <span>Description</span>
    <textarea rows="5" value={element.description}
     onChange={(e)=>{handleInputChange(element._id,"description",e.target.value)}}
     disabled={
       editingMode !== element._id ? true:false
     }
    ></textarea>
  </div>
  {/* location */}
  <div>
    <span>Location</span>
    <textarea rows="5" value={element.location}
     onChange={(e)=>{handleInputChange(element._id,"location",e.target.value)}}
     disabled={
       editingMode !==element._id ? true:false
     }
    ></textarea>
  </div>
</div>

                   
                   
                </div>
                {/*========== button==== */}
                <div className="button_wrapper">
                  <div className="edit_btn_wrapper">
                    {
                      editingMode === element._id ?
                      (
                        <>
                        <button
                        className='check_btn'
                        onClick={()=>handleUpdateJob(element._id)}>
                         <FaCheck/>
                        </button>
                        <button
                        className='check_btn'
                        onClick={()=>handleDisableEdit()}>
                         <RxCross2/>
                        </button>
                        </>
                      ):(<>
                      <button 
                      className='edit_btn'
                      onClick={()=>handleEnableEdit(element._id)}>
                        Edit
                        </button>  
                        
                      </>)
                     }

                  </div>
                  <button onClick={()=>handleJobDelete(element._id)} className='delete_btn'>
                        Delete
                        </button>  
                </div>
              </div>

            )

            })}

          </div>
          </>):(
            <p>You've not posted any job or maybe you deleted your all job</p>
          )
        }
      </div>
    
    </div>
  )
}

export default MyJobs
