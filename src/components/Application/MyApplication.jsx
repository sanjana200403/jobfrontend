import { useContext, useEffect, useState } from "react"
import {Context} from "../../main"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import ResumeModal from "./ResumeModal"
const MyApplication = ()=>{
   const [application,setApplication] = useState([])
   const [modelOpen,setModelOpen] = useState(false)
   const [resumeImageUrl,setResumeImageUrl] = useState("")
   const {user,isAuthorized} = useContext(Context)
   const navigate = useNavigate()
   useEffect(()=>{
      try{
         if(user && user.role=="Employer")
         {
           axios.get("https://jobdemo.onrender.com/api/v1/application/employer/getall",{withCredentials:true}).then((res)=>{
            setApplication(res.data.application)
           })
         }else{
            axios.get("https://jobdemo.onrender.com/api/v1/application/jobseeker/getall",{withCredentials:true}).then((res)=>{
               setApplication(res.data.application)
              })
         }
      }catch(error){
         toast.error(error.response.data.message)

      }

   },[isAuthorized])
   if(!isAuthorized){
navigate("/login")
   }
   const deleteApplication = (id)=>{
      try{
         console.log(id)
         axios.delete(`https://jobdemo.onrender.com/api/v1/application/delete/${id}`,
         {withCredentials:true}).then((res)=>{
            toast.success(res.data.message)
            setApplication(precApplication=>(
               precApplication.filter((application)=>application._id !== id)
            ))
         })

      }catch(error){
         console.log(error)
        toast.error(error.response.data.message)

      }
   }

   const openModal = (imageUrl)=>{
      console.log("open")
      setModelOpen(true)
      console.log(modelOpen)
   setResumeImageUrl(imageUrl)

   }
   const closeModal = ()=>{
      setModelOpen(false)
   }
   return(
  <section className="my_applications page">
   {
      user &&  user.role === "Job Seeker" ? (
         <div className="container">
            <h1>My Applications</h1>
            
          {application.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) :(application.map((element)=>{
                  return(
                    <JobSeekerCard
                    element={element}
                    key={element._id}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                    />
                  )
               }))
            }

         </div>
      ):( <div className="container">
            <h1>Applications From Job Seeker</h1>
            {
               application.map((element)=>{
                  return(
                   <EmployerCard 
                   element={element}
                   key={element._id}
                   openModal={openModal}
                   />  
                  )
               })
            }

         </div>)
   }
   {
      modelOpen && (
         <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )
   }

  
  </section>
   )
}
export default MyApplication
// ================

const JobSeekerCard = ({  element,  deleteApplication,  openModal }) => {
   return (
      <>
        <div className="job_seeker_card">
          <div className="detail">
            <p>
              <span>Name:</span> {element.name}
            </p>
            <p>
              <span>Email:</span> {element.email}
            </p>
            <p>
              <span>Phone:</span> {element.phone}
            </p>
            <p>
              <span>Address:</span> {element.address}
            </p>
            <p>
              <span>CoverLetter:</span> {element.coverLetter}
            </p>
          </div>
          <div className="resume">
            <img
              src={element.resume.url}
              alt="resume"
              onClick={() => openModal(element.resume.url)}
            />
          </div>
          <div className="btn_area">
            <button onClick={() =>
                deleteApplication(element._id)}>
              Delete Application
            </button>
          </div>
        </div>
      </>
    );

};

const EmployerCard = ({ element, openModal }) => {
   return (
      <>
        <div className="job_seeker_card">
          <div className="detail">
            <p>
              <span>Name:</span> {element.name}
            </p>
            <p>
              <span>Email:</span> {element.email}
            </p>
            <p>
              <span>Phone:</span> {element.phone}
            </p>
            <p>
              <span>Address:</span> {element.address}
            </p>
            <p>
              <span>CoverLetter:</span> {element.coverLetter}
            </p>
          </div>
          <div className="resume">
            <img
              src={element.resume.url}
              alt="resume"
              onClick={() => openModal(element.resume.url)}
            />
          </div>
        </div>
      </>
    );

};