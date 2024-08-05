import React from 'react'
import Sort from './filteruitils/Sort'
import FilterRelations from './filteruitils/FilterRelations'

const Filter:React.FC = () => {
  return (
    <div className='filter'>
     <Sort />
     <FilterRelations />
    </div>
  )
}

export default Filter