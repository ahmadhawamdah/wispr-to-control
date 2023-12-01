"use client";
import React, { useState, useEffect } from "react";

type TimerProps = {
  onTimeout: () => void;
};

const Timer: React.FC<TimerProps> = ({ onTimeout }) => {
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval);
      onTimeout();
    }

    return () => clearInterval(interval);
  }, [seconds, onTimeout]);

  return <p>{seconds > 0 ? `Timer: ${seconds}s` : ""}</p>;
};

export default Timer;
