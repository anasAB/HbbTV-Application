import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export interface IVideoItem {
    title: string;
    thumbnail: string;
    videoUrl: string;
}


const MainScreen = () => {

    const [data, setData] = useState<IVideoItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/videos.json')
            .then(response => response.json())
            .then(fetchedData => setData(fetchedData))
            .catch(error => console.error("Failed to fetch data:", error));
    }, []);

    const playVidoHandler = (video: IVideoItem) => navigate('/videoplayer', { state: { video } })

    return (
        <div className="grid grid-cols-3 gap-4 p-4 flex flex-wrap justify-center">
            {data.map((video, index) => (
                <Card sx={{ maxWidth: 345, margin: '0 auto', marginBottom: '20px' }} key={index}>
                    <CardActionArea onClick={() => playVidoHandler(video)}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={video.thumbnail}
                            alt={video.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {video.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}

        </div>
    );

}



export default MainScreen;

// className='w-64 p-4 rounded-lg bg-three flex flex-col space-y-4' flex flex-col space-y-2