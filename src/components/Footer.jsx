import React from 'react'

const Footer = () => {
  return (
<footer className="bg-slate-800 text-white py-2 mt-2 border-t border-gray-700">
  <div className="max-w-7xl mx-auto px-4 text-center text-sm">
    <p className="mb-2">
      🔐 Made with 💚 by <span className="text-green-400 font-semibold">Vineet Kumar Yadav</span>
    </p>
    <p className="text-gray-400">
      &copy; {new Date().getFullYear()} Password Manager. All rights reserved.
    </p>
  </div>
</footer>

  )
}

export default Footer