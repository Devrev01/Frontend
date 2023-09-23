import React from 'react'
import Navbar from '../components/Navbar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import bg from '../assests/bg.jpeg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const data = [
    { id: 1, image: bg, title: 'Harry potter', author: 'J.K Rowling', price: "120", category: "fiction", description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
    { id: 2, image: bg, title: 'Harry potter', author: 'J.K Rowling', price: "120", category: "fiction", description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
    { id: 3, image: bg, title: 'Harry potter', author: 'J.K Rowling', price: "120", category: "fiction", description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
    { id: 4, image: bg, title: 'Harry potter', author: 'J.K Rowling', price: "120", category: "fiction", description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
    { id: 5, image: bg, title: 'Harry potter', author: 'J.K Rowling', price: "120", category: "fiction", description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
    { id: 6, image: bg, title: 'Harry potter', author: 'J.K Rowling', price: "120", category: "fiction", description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
    { id: 7, image: bg, title: 'Harry potter', author: 'J.K Rowling', price: "120", category: "fiction", description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
    { id: 8, image: bg, title: 'Harry potter', author: 'J.K Rowling', price: "120", category: "fiction", description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" },
  ]

  const navigate = useNavigate();
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='p-7 flex flex-wrap gap-5 justify-center'>
        {data.map((value, i) => (
          <Card sx={{ maxWidth: 345, cursor: 'pointer ' }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={value.image}
            />
            <div onClick={()=>navigate('/bookdetails/123')}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" >
                  {value.title}
                </Typography>
                <div className='flex justify-between items-center'>
                  <Typography gutterBottom component="div" sx={{ fontSize: "16px" }} >
                    {value.author}
                  </Typography>
                  <Typography gutterBottom component="div" sx={{ fontSize: "14px" }} >
                    ₹{value.price}
                  </Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </CardContent>

            </div>
            <CardActions className='flex justify-between items-center'>
              <Button variant='outlined' sx={{ textTransform: "capitalize", fontWeight: "600" }}>Add to Cart</Button>
              <div className='bg-[#83FFC9] px-2 py-1 rounded-md flex items-center'>
                <span className='text-[12px] font-[700] text-[#00693B]'>{value.category}</span>
              </div>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Home