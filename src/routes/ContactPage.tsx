import React from 'react'
import NavigationShower from '../uitils/NavigationShower'
import LeftContact from '../components/contactpageuitils/LeftContact'
import RightContact from '../components/contactpageuitils/RightContact'
import { Helmet } from 'react-helmet'

const ContactPage:React.FC = () => {
  return (
    <div className='contact-page-wrapper'>
         <Helmet>
        <title>Furqan Mebel | Əlaqə</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Your Name or Company" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
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