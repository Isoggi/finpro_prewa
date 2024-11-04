'use client';
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  onExpired?: (expired: boolean) => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  onExpired,
}) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = { hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      if (onExpired) onExpired(true);
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div>
      <div>Sisa Waktu:</div>
      <div
        className={`text-3xl ${timeLeft.hours === 0 && timeLeft.minutes <= 15 ? 'text-red-500' : ''}`}
      >
        {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
      </div>
    </div>
  );
};

export default CountdownTimer;
