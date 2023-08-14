import React, { useEffect, useContext } from "react";
import { ToastVisibilityContext } from "../context/userContext";
import { Toast } from "../styles/css";

const ToastMessage = ({ message, type, duration }) => {
  //   const [isVisible, setIsVisible] = useState(false);
  const [
    toastVisible,
    setToastVisible,
    ,
    setToastMessage,
    ,
    setToastType,
  ] = useContext(ToastVisibilityContext);

  useEffect(() => {
    // setIsVisible(true)
    const timeoutId = setTimeout(() => {
      setToastVisible(!toastVisible);
      setToastMessage("");
      setToastType("");
    }, duration);
    return () => clearTimeout(timeoutId);
  }, [duration]);

  return (
    <>
      {toastVisible && (
        <Toast type={type}>
          {console.log("message: ", message)}
          <p>{message}</p>
        </Toast>
      )}
    </>
  );
};

export default ToastMessage;
