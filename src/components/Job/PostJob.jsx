import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const PostJob = () => {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [category,setCategory] = useState("")
  const [country,setCountry] = useState("")
  const [city,setCity] = useState("")
  const [location,setLocation] = useState("")
  const [salaryFrom,setSalaryFrom] = useState("")
  const [salaryTo,setSalaryTo] = useState("")
  const [fixedSalary,setFixedSalary] = useState("")
  const [salaryType,setSalaryType] = useState("")
  const {isAuthorized,setIsAuthorized,setUser,user} = useContext(Context)
const navigate = useNavigate()
console.log(user,"post job")
  
const handleJobPost = async (e)=>{
  e.preventDefault();
  if(salaryType === "Fixed Salary"){
    setSalaryFrom("")
    setSalaryTo("")
  }else if(salaryType == "Ranged Salary"){
    setFixedSalary("")

  }else{
    setSalaryFrom("")
    setSalaryTo("")
    setFixedSalary("")
  }
  await axios.post("https://jobdemo.onrender.com/api/v1/job/post",fixedSalary.length >=4 ? {title,category,country,city,location,fixedSalary,description
}:{title,category,country,city,location,salaryFrom,salaryTo,description},
  {withCredentials:true,headers: {
    "Content-Type":"application/json"
  }}).then((res)=>{
    console.log(res,"PostJob!!")
    toast.success(res.data.message)
    navigate('/job/getall')
  }).catch((error)=>{
    toast.error(error.response.data.message)
    console.log("error in posting Job!!",error)


  })


}


if(!isAuthorized || user.role !== "Employer"){
  
  navigate("/")
  }



  return (
    <div className='job_post page'>
      <div className="container">
        <h3>POST NEW JOB</h3>
        <form onSubmit={handleJobPost}>
          <div className="wrapper">
            <input type="text"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            placeholder='job title'
            />
            <select  value={category} onChange={(e)=>setCategory(e.target.value)}>                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="Web Development">
                  WEB DEVELOPMENT
                </option>
                <option value="MACHINE LEARNING">MACHINE LEARNING</option>


            </select>

          </div>
          <div className="wrapper">
            <input type="text"
            placeholder='Country'
            value={country}
            onChange={(e)=>{
               setCountry(e.target.value)
            }}
            />
              <input type="text"
            placeholder='City'
            value={city}
            onChange={(e)=>{
               setCity(e.target.value)
            }}
            />

          </div>
          <input type="text"
          placeholder='Location'
           value={location}
          onChange={(e)=>{
            setLocation(e.target.value)
          }} />
          <div className="salary_wrapper">
            <select  value={salaryType}
            onChange={(e)=>setSalaryType(e.target.value)}
            >
                 <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>

            </select>
            <div>
              {
                salaryType == "default" ? (<p>Please provide salary type*</p>):
                 salaryType==="Fixed Salary" ?(
                  <input type="number"  value={fixedSalary}
                  onChange={(e)=>setFixedSalary(e.target.value)}
                  placeholder='Enter fixed salary' />
                 ):(
                  <div className='ranged_salary'>
                     <input type="number"
                     placeholder='salary From'
                     value={salaryFrom}
                     onChange={(e)=>setSalaryFrom(e.target.value)}
                 
                     />
                       <input type="number"
                     placeholder='salary To'
                     value={salaryTo}
                     onChange={(e)=>setSalaryTo(e.target.value)}
                 
                     />
                  </div>
                 )
                
              }
            </div>

          </div>
          <textarea rows="10" value={description}
          onChange={(e)=>setDescription(e.target.value)}
          placeholder='Description'
          ></textarea>
          <button type='submit'> Create Job </button>

        </form>

      </div>
      
    </div>
  )
}

export default PostJob
