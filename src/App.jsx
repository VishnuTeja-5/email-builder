import { useState } from 'react'
import { Link, Links } from 'react-router-dom';
import { cn } from './lib/utils';
import { LogoutBtn, TemplateOne } from './components';


function App() {
  const [count, setCount] = useState(0)
  // console.log(config.appwriteUrl);

  return (
    <div className='w-full h-screen flex flex-col gap-4 justify-center items-center font-semibold bg-blue-100'>
      <h1 className={cn('text-4xl text-center')}>The go-to HTML email builder</h1>
      <Link to={'/login'}>
      <button className={cn('px-4 py-2 bg-blue-400 rounded-lg hover:scale-105 hover:rotate-2 duration-300')}>
        Let's Go
      </button>
      </Link>

    </div>
    // <TemplateOne />

  )
}

export default App
