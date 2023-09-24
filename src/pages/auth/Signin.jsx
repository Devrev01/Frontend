import React, { useEffect, useState } from 'react';
import logo from '../../assests/logo.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import google from '../../assests/google.png'
import { Alert, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
    const [seepass, setSeepass] = useState(false);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidemail, setInvalidemail] = useState(false);
    const [invalidcredentials, setInvalidcredentials] = useState(false);
    const [googleAlert, setGoogleAlert] = useState(false);
    const [initial, setInitial] = useState(true);
    const navigate = useNavigate(false);

    const login = async () => {
        try {
            const { data } = await axios.post("https://bookmanager-7yd6.onrender.com/api/auth/login", { email: mail, password }, { withCredentials: true })
            if (data.status === "success") {
                localStorage.setItem("isSignedIn", true);
                navigate("/home");
            }
        } catch (err) {
            if (err.response.data.msg === "User not found") {
                setInvalidemail(true);
                setTimeout(() => {
                    setInvalidemail(false);
                }, 5000)
            }
            if (err.response.data.msg === "Invalid credentials") {
                setInvalidcredentials(true);
                setTimeout(() => {
                    setInvalidcredentials(false);
                }, 5000)
            }
        }
    }

    const googlelogin = async () => {
        try {
            window.location.href = "https://bookmanager-7yd6.onrender.com/api/auth/google";
        } catch (err) {
            console.log(err)
        }
    }
    const location = useLocation()
    useEffect(() => {
        if (initial) {
            const isSignedIn = localStorage.getItem("isSignedIn");
            if (isSignedIn) {
                navigate("/home");
            }
            else {
                const urlParams = new URLSearchParams(location.search);
                const error = urlParams.get('error');
                // const success = urlParams.get('success');
                const email = urlParams.get('email');
                if (error) {
                    setGoogleAlert(true)
                    setTimeout(() => {
                        setGoogleAlert(false)
                    }, 5000)
                }
                // else if(success){
                //     localStorage.setItem("isSignedIn", true);
                //     navigate("/home")
                // }
                else if(email){
                    const setSession = async()=>{
                        try{
                            const {data} =await axios.get(`https://bookmanager-7yd6.onrender.com/api/auth/setSession/${email}`,{withCredentials:true})
                            console.log(data)
                        }catch(err){
                            console.log(err)
                        }
                    }
                    setSession();
                }
            }
            setInitial(false)
        }
    }, [initial, location, navigate])
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
                </div>
                <div className='flex justify-center flex-col gap-3 items-center'>
                    <Button type='button' variant='contained' color='success' disableRipple sx={{ padding: "12px 45px" }} onClick={login}>Login</Button>
                    <div className='flex gap-1'>
                        <span className='text-[18px] font-[500] text-[#4D5959] '>Don't have an account?</span>
                        <span className='text-[18px] text-[#007074] font-[500] cursor-pointer' onClick={() => navigate("/signup")}>Sign up</span>
                    </div>
                    <span className='text-[#043133] text-[22px] font-[500] '>OR</span>
                    <div className='p-3 border-2 border-[#D2D2D2] cursor-pointer flex gap-1 items-center' onClick={googlelogin}>
                        <img src={google} alt="google" className='w-[30px] h-[30px]' />
                        <span className='text-[#043133] text-[16px] font-[500]'>Login with Google</span>
                    </div>
                </div>
                {invalidemail &&
                    <Alert severity='error' sx={{ position: 'absolute', top: '6rem', right: '0px' }}>User not found</Alert>
                }
                {invalidcredentials &&
                    <Alert severity='error' sx={{ position: 'absolute', top: '6rem', right: '0px' }}>Invalid Credentials</Alert>
                }
                {googleAlert &&
                    <Alert severity='error' sx={{ position: 'absolute', top: '6rem', right: '0px' }}>Please signup first</Alert>
                }
            </div>
        </div>
    )
}

export default Signin