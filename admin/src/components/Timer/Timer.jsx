import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import AnimationBall from "../../assets/AnimationBall.json";
import './Timer.scss'; // Import SCSS file

function Timer() {
  const [seconds, setSeconds] = useState(55);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds > 0 ? prevSeconds - 1 : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;

  return (
    <div className="loading-screen">
      <Lottie animationData={AnimationBall} loop={true} className="animation"/>
      <h1 className="message">Due to 15 min of inactivity the server went to sleeping mode please wait for {seconds} seconds while the serve restarts</h1>
      <div className="timer-container">
        <span className="timer-text">{formattedTime}</span>
      </div>
    </div>
  );
}

export default Timer;