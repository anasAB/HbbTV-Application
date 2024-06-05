import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './MainScreen';
import VideoPlayer from './VideoPlayer';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/VideoPlayer" element={<VideoPlayer />} />
    </Routes>
  </Router>
  );
}

export default App;
