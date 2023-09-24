import React, { useState } from 'react';
import logo from '../../assests/logo.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const Signup = () => {
    const [seepass, setSeepass] = useState(false);
    const [confirmpass, setConfirmpass] = useState(false);
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [conpassword, setConpassword] = useState('');
    const [passalert, setPassalert] = useState(false);
    const [useralert, setUseralert] = useState(false);
    const navigate = useNavigate(false);

    const postdata = async () => {
        const userdata = { fullName: name, email: mail, password }
        const isCorrectpass = conpassword === password
        try {
            if (isCorrectpass) {
                const { data } = await axios.post('https://bookmanager-7yd6.onrender.com/api/auth/register', userdata,{withCredentials:true});

                if (data.status === "success") {
                    navigate('/check');
                }  
            } else {
                setPassalert(true);
                setTimeout(() => {
                    setPassalert(false);
                }, 5000)
            }
        } catch (err) {
            if(err.response.data.status === "failed") {
                setUseralert(true);
                setTimeout(()=>{
                    setUseralert(false);
                },5000)
            }
        }
    }
    
    

    return (
        <div className='w-full flex'>
            <div className="bg-[url('/src/assests/image.png')] bg-no-repeat bg-cover h-screen w-[40%] sticky top-0 left-0"></div>
            <div className='w-[60%] flex flex-col p-3 px-7 gap-10'>
                <div className='flex items-center justify-center gap-1'>
                    <span className='text-[48px] font-[600] text-[#043133]'>Welcome to</span>
                    <img src={logo} alt="logo" className='w-1/2' />
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col w-full px-24'>
                        <span className='text-[16px] text-[#4D5959] font-[500] leading-[30px]'>Full Name</span>
                        <div className='bg-[#EFF0F2] p-3 w-full flex items-center'>
                            <input type="text" style={{ border: 'none', outline: 'none', backgroundColor: "#EFF0F2", width: "100%" }} placeholder='Your name here.' onChange={(event) => setName(event.target.value)} />
                        </div>
                    </div>
                    <div className='flex flex-col w-full px-24'>
                        <span className='text-[16px] text-[#4D5959] font-[500] leading-[30px]'>Email</span>
                        <div className='bg-[#EFF0F2] p-3 w-full flex items-center'>
                            <input type="text" style={{ border: 'none', outline: 'none', backgroundColor: "#EFF0F2", width: "100%" }} placeholder='Enter your Email here.' onChange={(event) => setMail(event.target.value)} />
                        </div>
                    </div>
                    <div className='flex flex-col w-full px-24'>
                        <span className='text-[16px] text-[#4D5959] font-[500] leading-[30px]'>Password</span>
                        <div className='bg-[#EFF0F2] p-3 w-full flex items-center justify-between'>
                            <input type={!seepass ? "password" : "text"} style={{ border: 'none', outline: 'none', backgroundColor: "#EFF0F2", width: "100%" }} placeholder='Enter your Password here.' onChange={(event) => setPassword(event.target.value)} />
                            <div onClick={() => setSeepass(!seepass)} className='cursor-pointer'>{seepass ? <VisibilityIcon sx={{ color: "#4D5959" }} /> : <VisibilityOffIcon sx={{ color: "#4D5959" }} />}</div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full px-24'>
                        <span className='text-[16px] text-[#4D5959] font-[500] leading-[30px]'>Confirm Password</span>
                        <div className='bg-[#EFF0F2] p-3 w-full flex items-center justify-between'>
                            <input type={!confirmpass ? "password" : "text"} style={{ border: 'none', outline: 'none', backgroundColor: "#EFF0F2", width: "100%" }} placeholder='Confirm your Password here.' onChange={(event) => setConpassword(event.target.value)} />
                            <div onClick={() => setConfirmpass(!confirmpass)} className='cursor-pointer'>{confirmpass ? <VisibilityIcon sx={{ color: "#4D5959" }} /> : <VisibilityOffIcon sx={{ color: "#4D5959" }} />}</div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center flex-col gap-3 items-center'>
                    <Button variant='contained' color='success' disableRipple sx={{ padding: "12px 20px" }} onClick={postdata}>Create Account</Button>
                    <div className='flex gap-1'>
                        <span className='text-[18px] font-[500] text-[#4D5959] '>Already have an account?</span>
                        <span className='text-[18px] text-[#007074] font-[500] cursor-pointer' onClick={() => navigate("/signin")}>Log in</span>
                    </div>
                </div>
                {useralert &&
                    <Alert severity='error' sx={{ position: 'absolute', top: '6rem', right: '0px' }}>User Already Exist!!</Alert>
                }
                {passalert &&
                    <Alert severity='error' sx={{ position: 'absolute', top: '6rem', right: '0px' }}>Password and Confirm Password should match..</Alert>
                }
            </div>
        </div>
    )
}

export default Signup