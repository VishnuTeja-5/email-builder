import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../store/authSlice'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
    <Link to={'/'}>
      <motion.button
        className='p-2 flex justify-center items-center rounded-md bg-blue-500 text-white hover:bg-blue-700 '
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.9
        }}
        transition={{
          duration: 0.25
        }}
      onClick={logoutHandler}
      >
        Logout
      </motion.button>
    </Link>
    // <button
    // className=''
    // onClick={logoutHandler}
    // >Logout
    // </button>
  )
}

export default LogoutBtn