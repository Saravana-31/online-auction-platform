import React, { useState, useEffect } from "react";
import { FaHourglassHalf } from "react-icons/fa";


const Timer = ({ endDate, onTimerFinish, itemSold }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const endTime = new Date(endDate);
    const currentTime = new Date();
    return Math.max(0, endTime - currentTime);
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const remainingTime = calculateTimeRemaining();
      setTimeRemaining(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        onTimerFinish(); // Trigger the callback when timer finishes
      }
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup on component unmount
  }, [endDate, onTimerFinish]);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className={itemSold?"itemkahaal-sold":"itemkahaal-notsold"}>
      {itemSold ? (
        <div>Sold!</div>
      ) : (
        <div>
          <FaHourglassHalf className="hourglass"/>
          {days} days, {hours} hours, {minutes} minutes
        </div>
      )}
    </div>
  );
};

export default Timer;
