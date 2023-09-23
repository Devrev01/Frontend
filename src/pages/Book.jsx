import React from 'react'
import Navbar from '../components/Navbar'
import bg from '../assests/image.png'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Book = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col gap-10 h-screen pb-5'>
            <Navbar />
            <div className='flex items-center cursor-pointer gap-1 px-7' onClick={()=>navigate('/home')}>
                <ArrowBackIcon sx={{color:'#F87171'}}/>
                <span className='text-[18px] font-[500] text-red-400'>Go Back</span>
            </div>
            <div className='flex justify-center h-full gap-10 px-10 '>
                <div className='w-[40%] h-[450px]'>
                    <img src={bg} alt="book" className='w-full h-full' />
                </div>
                <div className='flex flex-col gap-3 w-[60%]'>
                    <h1 className='text-[30px] font-[600] text-[#043133] text-left'>Harry Potter{" ("}The Philospher's Stone{")"}</h1>
                    <div className='flex gap-1 items-center'>
                        <span className='text-[20px] font-[600] text-[#043133] '>Author :</span>
                        <span className='text-[20px] font-[600] text-[#4D5959]'>J.K Rowling</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span className='text-[20px] font-[600] text-[#043133] '>Publisher :</span>
                        <span className='text-[20px] font-[600] text-[#4D5959]'>J.K Rowling</span>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <span className='text-[20px] font-[600] text-[#043133] '>No. of copies :</span>
                        <span className='text-[20px] font-[600] text-[#4D5959]'>2</span>
                    </div>
                    <div className='flex gap-1 '>
                        <span className='text-[20px] font-[600] text-[#043133] '>Description :</span>
                        <span className='text-[20px] font-[600] text-[#4D5959] w-[65%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, labore!</span>
                    </div>
                </div>

            </div>
            <div className='w-full flex justify-end px-10'>
                <Button variant='contained' color='success' sx={{padding:"12px 20px",textTransform:'capitalize'}} >Add to Cart</Button>
            </div>

        </div>
    )
}

export default Book