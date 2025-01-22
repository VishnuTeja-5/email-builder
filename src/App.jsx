import { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';
import { selectUserData } from './components/store/authSlice';
import { useSelector } from 'react-redux';


function App() {
  const userData = useSelector(selectUserData)
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      console.log(userData);
      navigate('/dashboard');
    }else{
      navigate('/')
    }
  }, [userData, navigate]);

  return (
    <div className='w-full h-screen flex flex-col gap-4 justify-center items-center font-semibold bg-blue-100'>
      <h1 className={cn('text-4xl text-center')}>The go-to HTML email builder</h1>
      <Link to={'/login'}>
      <button className={cn('px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-lg hover:scale-105 hover:rotate-2 duration-300')}>
        Let's Go
      </button>
      </Link>

    </div>
    // <TemplateOne />

  )
}

export default App
