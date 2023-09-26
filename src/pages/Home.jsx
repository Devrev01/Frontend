import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import bg from '../assests/bg.jpeg';
import bg1 from '../assests/bg2.jpg';
import loader from '../assests/loader.svg'
import search from "../assests/search.png"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [value, setValue] = useState('')
  const [searchres, setSearchres] = useState([])
  const [userData, setuserData] = useState()
  const [loading, setLoading] = useState(false)
  const [currpage, setCurrpage] = useState(0)
  const [prevpage, setPrevpage] = useState(0)
  const [searched, setSearched] = useState(false)
  const [wasLastList, setWasLastList] = useState(false)
  const [initial, setInitial] = useState(true)

  const URL = `https://www.googleapis.com/books/v1/volumes?q=${value}&startIndex=${currpage}&maxResults=24&key=${process.env.REACT_APP_API_KEY}`;

  const handleKey = async (e) => {
    if (e.key === 'Enter') {
      setLoading(true)
      setSearchres([])
      setSearched(true)
      await getbooks()
      setLoading(false);
    }
  }
  const getbooks = async () => {
    try {
      const { data } = await axios.get(`${URL}`);
      if (!data?.items?.length) {
        setWasLastList(true);
      }
      else {
        setPrevpage(currpage);
        setCurrpage(currpage + 24);
        setSearchres([...searchres, ...data.items])
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getUser = async () => {
    try {
      const { data } = await axios.get("https://bookmanager-7yd6.onrender.com/api/auth/check-auth", { withCredentials: true });
      setuserData(data.user);
    } catch (err) {
      console.log(err)
    }
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (initial) {
      setInitial(false)
      const isSignedIn = localStorage.getItem("isSignedIn");
      if (!isSignedIn) {
        navigate("/signin");
      }
      else {
        getUser();
      }
    }
  },[initial,navigate])

  useEffect(() => {
    if (!wasLastList && prevpage !== currpage && !initial) {
      getbooks();
    }
  })


  const addcart = async (i) => {
    const postdata = { book_id: searchres[i].id, title: searchres[i].volumeInfo?.title, author: searchres[i].volumeInfo?.authors?.[0], price: searchres[i].saleInfo?.listPrice?.amount, cover: searchres[i].volumeInfo?.imageLinks?.thumbnail || searchres[i].volumeInfo?.imageLinks?.smallThumbnail || bg, category: searchres[i].volumeInfo?.categories?.[0] || "Knowledge" }
    await axios.post("https://bookmanager-7yd6.onrender.com/api/cart", postdata, { withCredentials: true });
    userData.booksId.push(searchres[i].id)
    setuserData({ ...userData })
  }

  return (
    <div className='flex flex-col w-full'>
      <Navbar userData={userData} />
      <div className="">
        <div className='relative '>
          <img src={bg1} alt="bg" className='w-full h-[450px]' />
          <div className='absolute top-1/4 left-[25%] flex flex-col w-1/2 text-center gap-3'>
            <span className='text-[40px] text-white font-[700]'>Find Books of your Choice.</span>
            <span className='text-[20px] text-white font-[700]'>A book is a garden, an orchard, a storehouse, a party, a company by the way, a counselor, a multitude of counselors.</span>
            <div className='border-2 p-3 rounded-full flex gap-1 bg-white'>
              <img src={search} alt="search" />
              <input type="search" style={{ border: 'none', outline: 'none', width: '100%' }} placeholder='Search' onChange={(event) => { setValue(event.target.value) }} onKeyDown={handleKey} />
            </div>
          </div>
        </div>
        {loading && <div className='p-3 flex flex-wrap justify-center'>
          <img src={loader} alt="loader" className='w-[150px]' />
        </div>
        }
        {searched && !loading && !searchres?.length && <div className='p-3 flex flex-wrap justify-center text-[28px] font-[600] text-[#043133] underline'>
          No results found
        </div>}
      </div>
      {searchres?.length > 0 &&
        <div className='p-7 flex flex-col gap-5'>
          <div className='flex justify-between'>
            <span className='text-[28px] font-[600] text-[#043133] underline'>Results for your search</span>
            <div className='flex gap-1 items-center'>
              <span className='text-[20px] font-[600] text-[#043133]'>Books count:</span>
              <span className='text-[18px] font-[400] text-[#B4B4B4] mt-1'>{searchres.length}</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-5 '>
            {searchres.map((value, i) => (
              <Card sx={{ width: 345, cursor: 'pointer ' }}>
                <CardMedia sx={{ objectFit: 'contain', height: 200, width: '100%', }}
                  component="img"
                  alt="image"
                  image={value.volumeInfo?.imageLinks?.thumbnail || value.volumeInfo?.imageLinks?.smallThumbnail || bg}
                />
                <CardContent>
                  <Typography gutterBottom component="div" sx={{ fontSize: "24px", fontWeight: "600", textAlign: 'center' }} className='truncate' >
                    {value.volumeInfo?.title}
                  </Typography>
                  <div className='flex justify-between items-center'>
                    <Typography gutterBottom component="div" sx={{ fontSize: "20px" }} >
                      {value.volumeInfo?.authors?.[0]}
                    </Typography>
                    <Typography gutterBottom component="div" sx={{ fontSize: "14px" }} >
                      {value.saleInfo?.saleability === "FOR_SALE" ? `₹${value.saleInfo?.listPrice.amount}` : value.saleInfo?.saleability}
                    </Typography>
                  </div>
                  <Typography variant="body2" color="text.secondary" >
                    Publisher: {value.volumeInfo?.publisher || "Not Available"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Published Year: {value.volumeInfo?.publishedDate?.slice(0, 4)}
                  </Typography>
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      Rating: {value.volumeInfo?.averageRating || "Not Available"}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions className='flex justify-between items-baseline'>
                  {userData.booksId.indexOf(value.id) === -1 && <Button variant='outlined' type='button' disabled={value.saleInfo?.saleability === "NOT_FOR_SALE"} sx={{ textTransform: "capitalize", fontWeight: "600" }} onClick={() => { addcart(i) }}>Add to Cart</Button>}
                  {userData.booksId.indexOf(value.id) > -1 && <Button variant='outlined' type='button' disabled={value.saleInfo?.saleability === "NOT_FOR_SALE"} sx={{ textTransform: "capitalize", fontWeight: "600" }} onClick={() => { navigate('/cart') }}>Go to Cart</Button>}
                  <div className='bg-[#83FFC9] px-2 py-1 rounded-md flex items-center'>
                    <span className='text-[12px] font-[700] text-[#00693B]'>{value.volumeInfo?.categories?.[0] || "Knowledge"}</span>
                  </div>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default Home