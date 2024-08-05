import React from 'react'

const Success:React.FC = () => {
  return (
    <div className='success-wrapper'>
          <div className="success-message">
               <div className="success-icon">
                    <img src="../verify.svg" alt="" />
               </div>
               <span>Uğurlu Ödəniş!</span>
          </div>
     </div>
  )
}

export default Success