import React, { useState, useEffect } from "react";

const Stopwatch = ({ isRunning, setIsRunning, timeLimit, setTimeOver }) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(
    typeof parseInt(timeLimit) === "number" ? parseInt(timeLimit) : 0
  );
  const [second, setSecond] = useState(0);

  useEffect(() => {
    if (parseInt(timeLimit)) {
      setMinute(parseInt(timeLimit));
    }
  }, [timeLimit]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (second > 0) {
          setSecond(second - 1);
        } else {
          if (minute > 0) {
            setMinute(minute - 1);
            setSecond(59);
          } else {
            if (hour > 0) {
              setHour(hour - 1);
              setMinute(59);
              setSecond(59);
            } else {
              setIsRunning(false);
            }
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [setIsRunning, hour, minute, second, isRunning, timeLimit]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  if (hour === 0 && minute === 0 && second === 0) {
    setTimeOver(true);
  }

  return (
    <div className="text-center">
      <div>
        <h1 className="font-semibold text-lg">
          Time:{" "}
          {`${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}`}
        </h1>
      </div>
    </div>
  );
};

export default Stopwatch;
