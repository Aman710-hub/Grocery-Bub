import React, { useEffect } from "react";

const Alert = ({ type, msg, alertFunc, list }) => {
  // every time this componet renders (it renders when we add  new item to the note list) this useEffect will run once ([])
  useEffect(() => {
    const timeOut = setInterval(() => {
      alertFunc();
    }, 3000);
    // this is useEffect "cleanup" function. With this i deleting prev function that has been called. Deleting prev function i make sure that they wont be called in the same time as currently running function
    return () => clearInterval(timeOut);
  }, [list]);
  return <p className={`alert alert-${type}`}> {msg}</p>;
};

export default Alert;
