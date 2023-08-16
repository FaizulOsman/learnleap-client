import React, { useState, useEffect } from "react";

const Stopwatch = ({ isRunning, setIsRunning, timeLimit }) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    if (parseInt(timeLimit) > 0) {
      setMinute(parseInt(timeLimit));
    }
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
  }, [hour, minute, second, isRunning, timeLimit]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="text-center">
      <div>
        <h1 className="font-semibold text-lg">
          Time:{" "}
          {`${formatTime(hour)}:${formatTime(minute) - 1}:${formatTime(
            second
          )}`}
        </h1>
      </div>
    </div>
  );
};

export default Stopwatch;
