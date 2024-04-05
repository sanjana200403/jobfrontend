import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='page notfound'>
    <div className="content">
      <img src="https://t4.ftcdn.net/jpg/03/88/63/83/360_F_388638369_wSBADhKfhiTx6Q5Pz1xfdpy6zotku1Sg.jpg" alt="notfound" />
      <Link to={'/'}>RETURN TO HOME PAGE</Link>
    </div>
  </section>
  )
}

export default NotFound
