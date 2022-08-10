import React from "react";
import { useState, useEffect, useRef } from "react";
const originalTitle = document.title;

const tick = (message) => {
  document.title = document.title === message ? originalTitle : message;
};

export const useTabNotification = (interval = 500) => {
  const [message, setMessage] = useState(null);
  const intervalRef = useRef(null);

  const clearMessage = () => {
    document.title = originalTitle;
    setMessage(null);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    !intervalRef.current && message
      ? (intervalRef.current = setInterval(tick, interval, message))
      : resetTimer();
  }, [message]);

  useEffect(() => () => clearInterval(intervalRef?.current), []);
  return [setMessage, clearMessage];
};
