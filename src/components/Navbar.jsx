import React from 'react'

const Navbar = () => {
    return (
        <nav className=' bg-slate-800 text-white '>
          <div className='mycontainer  px-4 py-5 h-14 flex justify-between items-center'>
              <div className='logo text-xl md:text-2xl font-bold'>
                 <span className='text-green-600'>&lt;</span>
                    Password
                    <span className='text-green-600'>Manager/&gt;</span>
                
              </div>
             
                <button className= 'hover:bg-green-500 bg-green-600 px-2 rounded-lg'><a className='flex items-center gap-2' href="https://github.com/Vineet112111"><img className='invert p-1' src="icons/github.png" width={30} alt="" /> <span className='hidden md:block font-bold'>GitHub</span></a></button>
          
          </div>
        </nav>
    )
}

export default Navbar
