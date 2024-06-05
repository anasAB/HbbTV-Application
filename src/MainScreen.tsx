import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Badge from '@mui/material/Badge'

export interface IVideoItem {
    id: number
    title: string
    thumbnail: string
    videoUrl: string
}

const MainScreen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {currentPlaysVideoId} = location.state

    const [data, setData] = useState<IVideoItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
      fetch('/videos.json')
       .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
       .then(fetchedData => {
          setData(fetchedData);
          setLoading(false);
        })
       .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }, [])
  
    const playVidoHandler = (video: IVideoItem) => navigate('/videoplayer', { state: { video } })
  
    const watchedPlaysVideoId = localStorage.getItem('videoIds')
  
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>


    return (
        <div className="grid grid-cols-3 gap-4 p-4 flex flex-wrap justify-center">
            {data.map((video) => (
                <Card sx={{ maxWidth: 345, margin: '0 auto', marginBottom: '20px' }} key={video.id}>

                    <CardActionArea onClick={() => playVidoHandler(video)}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={video.thumbnail}
                            alt={video.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <span className="mr-10">{video.title}</span>
                                {+currentPlaysVideoId === video.id &&
                                    <Badge badgeContent="Last Watch" color="secondary" max={999} className='w-[20px]' />
                                }
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                {watchedPlaysVideoId && watchedPlaysVideoId.includes(String(video.id)) &&
                                    <Badge badgeContent="Watched" color="success" />
                                }
                            </Typography>


                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
  }
  
  export default MainScreen
