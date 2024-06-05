import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileStepper from '@mui/material/MobileStepper'

const VideoPlayer = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0)


  const video = location.state.video;
  const { title, videoUrl, id } = video

  const onLoadHandler = (e: any): void => setCurrentPlaysVideoId(e.target.id)

  // Initialize state from local storage or start with an empty array
  const storedVideoIds = JSON.parse(localStorage.getItem('videoIds') || '[]');
  const [currentPlaysVideoId, setCurrentPlaysVideoId] = useState<number>(0);


  useEffect(() => {
    // Check if the ID is not already in the array before adding it
    const newVideoIds = storedVideoIds.includes(currentPlaysVideoId) ? storedVideoIds : [...storedVideoIds, currentPlaysVideoId];

    // Update the local storage with the new array of video IDs
    localStorage.setItem('videoIds', JSON.stringify(newVideoIds));

  }, [currentPlaysVideoId, storedVideoIds]);

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-600"> {title} </h1>
      <iframe
        id={id}
        onLoad={(e) => onLoadHandler(e)}
        width={1000}
        height={500}
        loading='lazy'
        src={videoUrl}
        title={title}
        allowFullScreen
        className=" rounded-lg shadow-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
      />

      <MobileStepper
        variant="dots"
        steps={6}
        position="static"
        activeStep={activeStep}

        nextButton={<Button size="small" onClick={handleNext} > Next </Button>}
        backButton={<Button size="small" onClick={handleBack} disabled={activeStep === 0}> Back </Button>}
      />

      <Button variant="contained" onClick={() => navigate('/', { state: { currentPlaysVideoId } })}>Main Screen</Button>

    </div>
  );
}


export default React.memo(VideoPlayer)
