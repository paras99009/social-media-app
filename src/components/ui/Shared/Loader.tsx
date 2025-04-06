import React from 'react'
import loader from '../../../../public/assets/icons/loader.svg'
function Loader() {
  return (
    <div className='flex-center w-full '>
        <img src={loader} alt="loader" width={24} height={24} />
      
    </div>
  )
}

export default Loader
