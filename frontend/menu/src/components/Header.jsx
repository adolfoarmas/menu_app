import React, { useContext, useEffect, useState } from "react";
import Logo from "../b36cde191e387823d890215d9d552c27.jpg";
import logoutUser from "../services/logoutUser.js";
import { Context } from "../context/userContext";
import {
  HeadderWrapper,
  ButtonNormal,
  ImageDiv,
  ButtonPanelDiv,
} from "../styles/css";
import BussinessInformationCard from "./BussinessInformationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import UserInformation from "./userInformation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { interpolate } from '../utils/utils'

const Header = () => {
  const { t } = useTranslation();
  const [logOut, setLogOut] = useState(false);
  const { key, csfrToken, userLoggedName } =
    useContext(Context);
  const navigate = useNavigate();
  const [userLoggedNameValue, setUserLoggedNameValue] = userLoggedName;
  const [userLoggedKey, setUserLoggedkey] = key;
  const [ , setCsfrTokenValue] = csfrToken;

  function handleLogout(e) {
    e.preventDefault();
    logoutUser(userLoggedKey)
      .then(() => {
        setUserLoggedkey(null);
        setCsfrTokenValue(null);
        setUserLoggedNameValue(null);
      })
      .catch((error) => console.errorlog("error", error))
      .finally(() => setLogOut(true));
  }

  useEffect(() => {
    if (logOut) {
      navigate("/login");
    }
    setLogOut(false);
  }, [logOut]);

  return (
    <>
      <HeadderWrapper>
        <ImageDiv>
          <img src={Logo} alt="Logo" />
        </ImageDiv>
        <BussinessInformationCard />
        <ButtonPanelDiv>
          {userLoggedNameValue ? (
            <UserInformation userName={userLoggedNameValue} />
          ) : (
            <></>
          )}
          <ButtonNormal hidden={!userLoggedKey} onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} /><p>{ t('logOut') }</p>
          </ButtonNormal>
        </ButtonPanelDiv>
      </HeadderWrapper>
    </>
  );
};

export default Header;
