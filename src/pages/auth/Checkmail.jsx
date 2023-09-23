import React, { useState, useEffect } from 'react';
import logo from '../../assests/logo.png';
import MailIcon from '@mui/icons-material/Mail';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Alert, Button } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Checkmail = () => {
    const [otp, setOtp] = useState('')
    const [initial, setInitial] = useState(true);
    const [userdata,setuserData] = useState('');
    const navigate = useNavigate();
    const [invalidalert,setInvalidalert] = useState(false);
    const [timealert,setTimealert] = useState(false);

    const verifyEmail = async ()=>{
        try{
           await axios.get("http://localhost:5000/api/auth/verifyEmail",{withCredentials:true});
        }catch(err){
            console.log(err)
        }
    }

    const verifyOtp = async () => {
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/verifyOtp", { otp },{withCredentials:true})
            if(data.status === "success"){
                navigate("/home")
            }
        }catch(err){
            if(err.response.data.msg === "Invalid OTP"){
                console.log('invvalid')
                setInvalidalert(true);
                setTimeout(()=>{
                    setInvalidalert(false);
                },5000)
            }
            if(err.response.data.msg === "Timeout"){
                console.log('time')
                setTimealert(true);
                setTimeout(()=>{
                    setTimealert(false)
                },5000)
            }
        }
    }


    const getUser = async () => {
        const { data } = await axios.get("http://localhost:5000/api/auth/check-auth" , {withCredentials:true});
        setuserData(data.user);
    }
    useEffect(() => {
        if (initial) {
            getUser();
            verifyEmail();
            setInitial(false);
        }
    }, [initial])

    return (
        <div className='w-full flex flex-col items-center gap-10'>
            <img src={logo} alt="" className='w-1/2 ' />
            <div className='flex flex-col justify-center items-center gap-5'>
                <div className='border-2 rounded-md p-3'>
                    <MailIcon />
                </div>
                <div className='flex flex-col gap-1 text-center'>
                    <span className='text-[28px] font-[500] text-[#4D5959]'>Check Your Mail</span>
                    <span className='text-[20px] font-[500] text-[#4D5959]'>We have sent a verification code to</span>
                    <span className='text-[16px] font-[500] text-[#4D5959]'>{userdata.email}</span>
                </div>
                <div className='flex flex-col gap-7'>
                    <MuiOtpInput value={otp} sx={{ width: '300px', height: '50px' }} onChange={(value) => setOtp(value)} />
                    <Button variant='contained' onClick={verifyOtp}>Verify Otp</Button>
                </div>
                <div>
                    <span className='text-[18px] font-[500] text-[#4D5959]'>Didn't get the otp? </span>
                    <span className='text-[18px] text-[#007074] font-[500] cursor-pointer' onClick={verifyEmail}>Resend Otp</span>
                </div>
            </div>
            {invalidalert &&
                <Alert severity='error' sx={{ position: 'absolute', top: '6rem', right: '0px' }}>Invalid Otp</Alert>
            }
            {timealert &&
                <Alert severity='error' sx={{ position: 'absolute', top: '6rem', right: '0px' }}>Invalid Otp</Alert>
            }



        </div>
    )
}

export default Checkmail