import React,{useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import {Header, Footer} from "../index"
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import authService from '../../appwrite/auth';
function Layout() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  return !loading ? (
    <div className=' w-full min-h-screen flex flex-col gap-2'>
        <Header/>
        <div className='w-full h-full flex-grow'>
          <Outlet />
        </div>
        <Footer />
    </div>
  ) : (
    // <div className='w-full h-screen flex justify-center items-center'>
    //   <h1>Loading...</h1>
    // </div>
    null
  )
}

export default Layout