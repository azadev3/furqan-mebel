import React from 'react'
import NavigationShower from '../uitils/NavigationShower'
import LeftContact from '../components/contactpageuitils/LeftContact'
import RightContact from '../components/contactpageuitils/RightContact'

const ContactPage:React.FC = () => {
  return (
    <div className='contact-page-wrapper'>
     <div className="contact-page">
          <NavigationShower prevpage='Əlaqə'/>
          <div className="container-contact">
               <LeftContact />
               <RightContact />
          </div>
     </div>
     </div>
  )
}

export default ContactPage