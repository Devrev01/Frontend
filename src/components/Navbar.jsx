import React from 'react';
import logo from "../assests/logo.png";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ userData }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/logout",{withCredentials:true})
      if (data.status === "success") {
        localStorage.removeItem("isSignedIn");
        navigate('/signin');
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='flex items-center px-3 justify-between gap-5 shadow-lg'>
      <div className='h-[100px] flex items-center'>
        <img src={logo} alt="logo" className='w-[250px] h-[72px]' />
      </div>
      <div className='flex gap-3 items-center'>
        <div className='cursor-pointer relative' onClick={() => navigate("/cart")}>
          <ShoppingCartIcon sx={{ width: '30px', height: '30px' }} />
          {userData?.booksId?.length > 0 &&
            <div className='w-[10px] h-[10px] rounded-full top-0 right-0 bg-red-300 absolute'></div>
          }
        </div>
        <div className='border-2 border-[#007074] rounded-md p-2 flex gap-2 items-center cursor-pointer' onClick={logout}>
          <LogoutIcon sx={{ width: "20px", height: "20px" }} />
          <span className='text-[#007074] font-[500] text-[18px]'>Log Out</span>
        </div>
      </div>

    </div>
  )
}

export default Navbar