import React from 'react';
import logo from '../assests/logo.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[url('/src/assests/bg1.jpg')] h-screen w-full bg-no-repeat bg-cover flex flex-col justify-center items-center">
            <div className='w-1/2 flex flex-col justify-center items-center gap-5'>
                <img src={logo} alt="logo" />
                <span className='text-white text-[32px] font-bold text-center'>Complete, Automated Library Management Software.</span>
                <Button variant='contained' sx={{textTransform:'capitalize',padding:'8px 18px'}} color='success' onClick={()=>navigate("/signup")}>Get Started</Button>
            </div>

        </div>
    )
}

export default Landing