import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-8 mb-12 md:mb-0 border-t border-slate-200 text-sm text-center '>
      &copy; MyFitTracker {new Date().getFullYear()}. All Rights Reserved.
    </div>
  )
}

export default Footer