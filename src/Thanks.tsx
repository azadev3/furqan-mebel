import React from 'react'
import { Link } from 'react-router-dom'

const Thanks:React.FC = () => {
  return (
    <div className='thanks-page'>
     <div className="success">
          <img src="../scc.svg" alt="successimg" />
     </div>
     <div className="texts">
          <h1>Müraciətiniz üçün təşəkkürlər</h1>
          <p>Pellentesque sed lectus nec tortor tristique accumsan quis dictum risus. Donec volutpat mollis nulla non facilisis.</p>
     </div>
     <Link to='/' className="home-btn">
          <img src="../House.svg" alt="houseimg" />
          <span>Ana səhifəyə qayıt </span>
     </Link>
    </div>
  )
}

export default Thanks