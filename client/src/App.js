import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import VideoRoom from './components/VideoRoom';
import './App.css';

// Direct links prefill the form; only an explicit Join/Create click opens media.
function RoomRoute() {
  const location = useLocation();
  return location.state?.joinMeeting ? <VideoRoom /> : <HomePage />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:roomId" element={<RoomRoute />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
