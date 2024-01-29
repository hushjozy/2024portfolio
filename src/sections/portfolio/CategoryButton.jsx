import React from 'react'

const CategoryButton = ({category, className, onChangeCategory}) => {
  return (
    <div>
        <button className={className} onClick={() => onChangeCategory(category)}>{category}</button>
    </div>
  )
}

export default CategoryButton
