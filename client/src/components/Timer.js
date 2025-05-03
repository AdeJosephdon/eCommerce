import { useState, useEffect } from 'react';


function Timer() {

  // Function for countdown timer
  const [timeLeft, setTimeLeft] = useState(4 * 24 * 60 * 60 * 1000); 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => Math.max(0, prevTimeLeft - 1000)); 
    }, 1000);

    return () => clearInterval(intervalId); 
  }, []); 

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Function for countdown timer ends above


  return (
    <div className="timer">
              <div className='time'>
                <p className="timeSession">Days</p>
                <p className="exact-time">{days}</p>
              </div>

<p className='colon'>:</p>
              <div className='time'>
                <p className="timeSession">Hours</p>
                <p className="exact-time">{hours}</p>
              </div>

<p className='colon'>:</p>
              <div className='time'>
                <p className="timeSession">Minutes</p>
                <p className="exact-time">{minutes}</p>
              </div>

<p className='colon'>:</p>
              <div className='time'>
                <p className="timeSession">Seconds</p>
                <p className="exact-time">{seconds}</p>
              </div>

            </div>
  );
}

export default Timer;