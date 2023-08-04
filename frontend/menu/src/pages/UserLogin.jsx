import Cookies from "js-cookie";
import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import loginUser from "../services/loginUser.js";
import getUserData from "../services/user/getUserData";
import { Context, ToastVisibilityContext } from "../context/userContext";
import {
  ButtonLogin,
  FormFieldNameLabel,
  FormLogin,
  FormLoginDiv,
  LoginButtonGroupDiv,
} from "../styles/css.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import ToastMessage from "../components/ToastMessage.jsx";
import { useTranslation } from 'react-i18next';


const UserLogin = () => {
  const { t } = useTranslation();
  
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [userData, setUserData] = useState([]);

  const [
    toastVisible,
    setToastVisible,
    toastMessage,
    setToastMessage,
    toastType,
    setToastType,
  ] = useContext(ToastVisibilityContext);

  const { key, csfrToken, userLoggedId, userLoggedName } = useContext(Context);

  const [csfrTokenValue, setCsfrTokenValue] = csfrToken;
  const [userLoggedKey, setUserLoggedkey] = key;
  const [userLoggedIdValue, setUserLoggedIdValue] = userLoggedId;
  const [userLoggedNameValue, setUserLoggedNameValue] = userLoggedName;

  const displayToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const getUserDataResponse = (userDataResponse) => {
    for (let i = 0; i <= userDataResponse.length; i++) {
      const apiUsername = userDataResponse[i]["username"];
      if (username.toLowerCase() === apiUsername.toLowerCase()) {
        const logedUserId = userDataResponse[i]["id"];
        const logedserName = userDataResponse[i]["username"];
        window.localStorage.setItem("logedUserId", logedUserId);
        window.localStorage.setItem("logedUserName", logedserName);
        setUserLoggedIdValue(userDataResponse[i]["id"]);
        setUserLoggedNameValue(userDataResponse[i]["username"]);
        break;
      }

      setUserName(null);
      setPassword(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const csfrTokenInCookies = Cookies.get('csrftoken');
    setCsfrTokenValue(csfrTokenInCookies);

    const tokenResponse = await loginUser({
      username,
      password,
    }).then((data) => {
      if (data.Error) {
        throw data;
      }
      return data;
    });

    const tokenResponseKey = tokenResponse.key;
    window.localStorage.setItem("logedUserToken", tokenResponseKey);
    setUserLoggedkey(tokenResponseKey);
    
    await getUserData(username, tokenResponseKey, csfrTokenInCookies)
    .then((data) => {
      setUserData(data);
      getUserDataResponse(data);
        return data;
      })
      .catch((error) => {
        console.log("error", error);
        displayToast(error, "error");
      });


  };
  return (
    <FormLoginDiv>
      {toastVisible && (
        <ToastMessage message={toastMessage} type={toastType} duration={3000} />
      )}
      <FontAwesomeIcon icon={faCircleUser} />
      <h2>{t('userLogin')}</h2>
      <FormLogin className="login-form-form" onSubmit={(e) => handleSubmit(e)}>
        <FormFieldNameLabel>
          <p>{t('userName')}</p>
          <input
            type="text"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormFieldNameLabel>
        <FormFieldNameLabel>
          <p>{t('password')}</p>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormFieldNameLabel>
        {/* <p> { errorText }</p> */}
        <LoginButtonGroupDiv>
          <ButtonLogin type="submit">{t('login')}</ButtonLogin>
          <a href="/">
            <FontAwesomeIcon icon={faLockOpen} /> {t('goToSeeTheMenu')}
          </a>
        </LoginButtonGroupDiv>
      </FormLogin>
      {userLoggedKey && userLoggedIdValue && userLoggedNameValue && <Navigate to="/" replace={true} />}
    </FormLoginDiv>
  );
};

export default UserLogin;
