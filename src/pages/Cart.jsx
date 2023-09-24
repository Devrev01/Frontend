import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Button, Paper } from '@mui/material';
import axios from 'axios';


const Cart = () => {
    const [cart, setCart] = useState([])
    const [initial, setInitial] = useState(true)

    const getcart = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/cart', { withCredentials: true })
            console.log(data)
            setCart(data.cart)

        } catch (err) {
            console.log(err)
        }
    }

    const removefromcart = async (id, i,ID) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/cart/${id}/${ID}`, { withCredentials: true })
            console.log(data)
            if (data.status === "success") {
                const newcart = [...cart]
                newcart.splice(i, 1)
                setCart(newcart)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (initial) {
            getcart();
            setInitial(false)
        }
    }, [initial])

    return (
        <div className='flex flex-col'>
            <Navbar />
            {cart.length === 0 &&
                <span className='text-[28px] font-[600] text-[#043133] flex flex-wrap justify-center'>Your Cart is empty !! </span>
            }
            <div className=' px-7 flex flex-col gap-3 py-5 w-full'>
                {cart.map((values, i) => (
                    <Paper elevation={2} className='h-[150px] flex items-center justify-center px-7 gap-3 w-full'>
                        <img src={values.cover} alt="alt" className='w-[150px] h-[100px]' />
                        <div className='flex flex-col gap-1 w-full justify-center'>
                            <span className='text-[18px] font-[600] text-[#18191F]'>Title: {values.title}</span>
                            <span className='text-[14px] font-[600] text-[#18191F]'>Author:{values.author}</span>
                            <span className='text-[14px] font-[600] text-[#18191F]'>Publisher:{values.author}</span>
                            <span className='text-[14px] font-[600] text-[#18191F]'>Price: ₹{values.price}</span>
                        </div>
                        <div className='flex justify-end w-[200px] h-[50px] '>
                            <Button variant='contained' sx={{ padding: "5px 10px", textTransform: 'capitalize' }} onClick={() => { removefromcart(values._id, i,values[i].id) }}>Remove from cart</Button>
                        </div>
                    </Paper>
                ))}
            </div>
        </div>
    )
}

export default Cart