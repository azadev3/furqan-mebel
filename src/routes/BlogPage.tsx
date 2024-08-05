import React from 'react'
import NavigationShower from '../uitils/NavigationShower'
import TopTwoCards from '../components/blogpageuitils/TopTwoCards'
import Blogs from '../components/blogpageuitils/Blogs'

const BlogPage:React.FC = () => {
  return (
    <div className='blog-page-wrapper'>
     <div className="blog-page">
          <NavigationShower prevpage='Blog'/>
          <TopTwoCards />
          <Blogs />
     </div>
    </div>
  )
}

export default BlogPage