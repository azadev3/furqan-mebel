import React from 'react'
import NavigationShower from '../uitils/NavigationShower'
import LeftContact from '../components/contactpageuitils/LeftContact'
import RightContact from '../components/contactpageuitils/RightContact'
import { Helmet } from 'react-helmet'
import { useSeo } from '../useSeo'

const ContactPage:React.FC = () => {

  const seoData = useSeo("contact_page");

  return (
    <div className='contact-page-wrapper'>
       <Helmet>
        <title>{seoData?.title || "Furqan Mebel"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Furqan Mebel" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="keywords" content={seoData?.seo_keywords || ""} />
        <meta name="description" content={seoData?.seo_description || ""} />
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