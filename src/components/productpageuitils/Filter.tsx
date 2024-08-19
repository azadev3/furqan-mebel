import React from 'react'
import Sort from './filteruitils/Sort'
import FilterRelations from './filteruitils/FilterRelations'
import CategoriesForFilter from './filteruitils/CategoriesForFilter'

const Filter:React.FC = () => {
  return (
    <div className='filter'>
     <CategoriesForFilter />
     <Sort />
     <FilterRelations />
    </div>
  )
}

export default Filter