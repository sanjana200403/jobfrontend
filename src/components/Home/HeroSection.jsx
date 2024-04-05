import React from 'react'
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <div className='heroSection'>
      <div className="container">
        <div className="title">
          <h1>Find a job that suits</h1>
          <h1>your interest and skills</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate maxime vitae harum ipsum alias, expedita id incidunt ipsam tempora quia esse ullam, vel animi ad excepturi sit voluptatum at. Quo.</p>

        </div>
        <div className="image">
          <img src="https://cdn.dribbble.com/users/2317423/screenshots/14181356/media/e52621161761e10d04b37911aa7935d2.jpg?resize=400x0" alt="hero" />
        </div>

      </div>
      <div className="details">
        { details.map((element)=>
        (
          <div className="card" key={element.id}>
            <div className="icon">
              {element.icon}
            </div>
            <div className="content">
              <p>{element.title}</p>
              <p>{element.subTitle}</p>

            </div>

          </div>
        ))

        }

      </div>
      
    </div>
  )
}

export default HeroSection
