import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <>
    <div style={{display:"flex", justifyContent:"space-around", padding:"1em", background:"gray", }}>
        <Link to="/">Todo</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
    </div>
    </>
  )
}
