import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import bg from '../assests/bg.jpeg';
import { IconButton, Paper } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


const Cart = () => {
    const data = [
        { id: 1, img: bg, title: "Harry Potter", author: "J.K Rowling", price: '120' },
        { id: 2, img: bg, title: "Harry Potter", author: "J.K Rowling", price: '120' },
        { id: 3, img: bg, title: "Harry Potter", author: "J.K Rowling", price: '120' },
        { id: 4, img: bg, title: "Harry Potter", author: "J.K Rowling", price: '120' },
        { id: 5, img: bg, title: "Harry Potter", author: "J.K Rowling", price: '120' },
        { id: 6, img: bg, title: "Harry Potter", author: "J.K Rowling", price: '120' },
        { id: 7, img: bg, title: "Harry Potter", author: "J.K Rowling", price: '120' },
    ]

    const [addsubjects, setAddsubjects] = useState(0);
    return (
        <div className='flex flex-col'>
            <Navbar />
            <div className=' px-7 flex flex-col gap-3 py-5'>
                {data.map((values, i) => (
                    <Paper elevation={2} className='h-[150px] flex items-center px-7 gap-3'>
                        <img src={values.img} alt="alt" className='w-[150px] h-[100px]' />
                        <div className='flex flex-col gap-1'>
                            <span className='text-[18px] font-[600] text-[#18191F]'>{values.title}</span>
                            <span className='text-[14px] font-[600] text-[#18191F]'>{values.author}</span>
                            <span className='text-[14px] font-[600] text-[#18191F]'>₹{values.price}</span>
                            <div className='flex items-center gap-3'>
                                <div className='border-2 rounded-full' onClick={() => setAddsubjects(addsubjects - 1)}>
                                    <IconButton sx={{width:"35px",height:"35px",display:'flex',justifyContent:"center"}}>
                                        <RemoveIcon />
                                    </IconButton>
                                </div>
                                <span className='text-[16px] font-[600] text-[#18191F]'>{addsubjects}</span>
                                <div className='border-2 p-1 rounded-full cursor-pointer' onClick={() => setAddsubjects(addsubjects + 1)}>
                                    <AddIcon />
                                </div>
                            </div>
                        </div>
                    </Paper>
                ))}
            </div>
        </div>
    )
}

export default Cart