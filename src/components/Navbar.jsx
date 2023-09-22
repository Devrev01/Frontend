import React from 'react';
import logo from "../assests/logo.png";
import search from "../assests/search.png"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center px-3 justify-between gap-5 shadow-lg'>
      <div className='h-[100px] flex items-center'>
        <img src={logo} alt="logo" className='w-[250px] h-[72px]' />
      </div>
      <div className='border-2 p-3 rounded-md flex gap-1 w-1/2 '>
        <img src={search} alt="search" />
        <input type="search" style={{ border: 'none', outline: 'none', width: '100%' }} placeholder='Search' />
      </div>
      <div className='flex gap-3 items-center'>
        <div className='cursor-pointer'>
          <ShoppingCartIcon sx={{width:'30px',height:'30px'}}/>
        </div>
        <div className='border-2 border-[#007074] rounded-md p-2 flex gap-2 items-center '>
          <LogoutIcon sx={{width:"20px" , height:"20px"}}/>
          <span className='text-[#007074] font-[500] text-[18px]' onClick={()=>navigate("/signin")}>Log Out</span>
        </div>


      </div>

    </div>
  )
}

export default Navbar