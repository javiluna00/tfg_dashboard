import React from 'react'
import MoodItem from './MoodItem'
import GenreItem from './GenreItem'

function ItemList({data_name, items, AxiosPrivate}) {

  if(data_name == "moods")
  {
    return (
      <div className='w-full mt-5 grid lg:grid-cols-6 sm:grid-cols-3 gap-5'>
          {items.map((item) => (
              <MoodItem key={item.id} mood={item}/>
          ))}
      </div>
    )
  }
  if(data_name == "genres")
  {
    return (
      <div className='w-full mt-5 grid lg:grid-cols-6 sm:grid-cols-3 gap-5'>
          {items.map((item) => (
              <GenreItem key={item.id} genre={item} AxiosPrivate={AxiosPrivate}/>
          ))}
      </div>
    )
  }
}

export default ItemList