import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Signup } from '../Components/Signup'
import { Login } from '../Components/Login'
import { Todo } from '../Components/Todo'

export const AllRouter = () => {
  return (
    <>
    <Routes>
       <Route path='/' element={<Todo/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}
