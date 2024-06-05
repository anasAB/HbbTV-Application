import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';


const VideoPlayer = () => {

  const navigate = useNavigate();
  const location = useLocation();
  
  const video = location.state.video;

  const { title, videoUrl } = video

  const test = (test:any) => {
    console.log('test',test);
    
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-600">
        {title}
      </h1>

      <iframe
        width={1000}
        height={500}
        loading='lazy'
        src={videoUrl}
        title={title}
        allowFullScreen
        className=" rounded-lg shadow-lg"
        onCanPlay={(e) => (test(e))}
        onPlay={(e) => test(e)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
      />

      {/* <iframe  src={videoUrl} width={1000} height={500} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"></iframe> */}



      <Button variant="contained" onClick={() => navigate('/')}>Main Screen</Button>
    </div>
  );
}


export default React.memo(VideoPlayer)
