import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status)

    const handleNav = () => {
        setIsOpen(!isOpen)
        console.log(isOpen);
    }
    return (
        <div className={cn('w-full flex flex-col items-end')}>
            <div className={cn('w-full flex justify-between items-center')}>
                <a href='/' className={cn('')}>
                <div className={cn('size-16')}>
                    <img src='/images/logo.png' className={cn('w-full')} />
                </div>
                </a>
                { authStatus ? (<LogoutBtn/>) : (
                    <div className={cn('w-full flex justify-end items-center gap-2')}>
                    <Link to={'/login'}>
                    <motion.button
                        className='p-2 flex justify-center items-center rounded-md bg-blue-500 '
                        whileHover={{
                            scale:1.05
                        }}
                        whileTap={{
                            scale:0.9
                        }}
                        transition={{
                            duration: 0.25
                        }}
                        // onClick={handleNav}
                        >
                            Login
                    </motion.button>
                    </Link>
                    <Link to={'/signup'}>
                    <motion.button
                        className='p-2 flex justify-center items-center rounded-md bg-blue-500 '
                        whileHover={{
                            scale:1.05
                        }}
                        whileTap={{
                            scale:0.9
                        }}
                        transition={{
                            duration: 0.25
                        }}
                        // onClick={handleNav}
                        >
                            Signup
                    </motion.button>
                    </Link>
                    </div>
                )
                
                }
            </div>
            {/* <AnimatePresence>
                {isOpen &&
                    <motion.div className={cn('w-full flex justify-center')}
                    initial={{
                        opacity:0,
                        height:0
                    }}
                    animate={{
                        opacity:1,
                        height: 'fit-content'
                    }}
                    exit={{
                        height:0,
                        opacity:0
                    }}
                    transition={{
                        duration: 0.5,
                        ease: 'easeInOut',
                    }}>
                        <ul className={cn('w-full flex flex-col justify-around items-end')}>
                            <li><Link to={'/login'}> Login </Link></li>
                            <li><Link to={'/signup'}> Signup </Link></li>
                        </ul>
                    </motion.div>}
            </AnimatePresence> */}
        </div>
    )
}

export default Navbar