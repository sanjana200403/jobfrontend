import { useContext, useState } from "react"
import { Context } from "../../main"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

const Application = ()=>{
    const [name,setName] =  useState("")
    const [email,setEmail] = useState("")
    const [coverLetter,setCoverLetter] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [resume,setResume] = useState(null)
    const {isAuthorized,user,} = useContext(Context)
    const navigate = useNavigate();
    // Function to handle file input change
      const handleFileChange = (e)=>{
        const  resume =  e.target.files[0]
        console.log(e.target.files)
        setResume(resume)
      }

      const {id} = useParams();
      const handleApplication = async(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("coverLetter", coverLetter);
        formData.append("resume", resume);
        formData.append("jobId", id);
        try{
          console.log("post application")
            const {data} = await axios.post("https://jobdemo.onrender.com/api/v1/application/post",
            formData,{
                withCredentials:true
            ,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        console.log(data)
        setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigate("/job/getall");


        

        }catch(error){
          toast.error(error.response.data.message)


        }

      }
      if(!isAuthorized || user && user.role == "Employer"){
        navigate("/")

      }


    return(
        <section className="application">
          <div className="container">
            <h3>Application Form</h3>
            <form onSubmit={handleApplication}>

         
          <input type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          
          />
           <input type="text"
          placeholder="Your Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          
          />
           <input type="number"
          placeholder="Your Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          
          />
           <input type="text"
          placeholder="Your Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          
          />
          <textarea rows="10" value={coverLetter}
          onChange={(e)=>setCoverLetter(e.target.value)} 
          placeholder="CoverLetter"
          >


          </textarea>
          <div>
            

        
        
          <label htmlFor="" style={{textAlign:"start",display:"block",fontSize:"20px"}}>
            Select Resume 

          </label>
          <input type="file" accept=".jpg , .png, .webp" 
          onChange={handleFileChange}
          style={{width:"100%"}}
          />
        </div>
        <button type="submit">Submit Application </button>  
  </form>
  </div>

        </section>
    )
}
export default Application