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
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const [logOut, setLogOut] = useState(false);
  const { token, csfrToken, userLoggedId, userLoggedName } =
    useContext(Context);
  const navigate = useNavigate();
  const [userLoggedNameValue, setUserLoggedNameValue] = userLoggedName;
  const [tokenValue, setTokenValue] = token;
  const [csfrTokenValue, setCsfrTokenValue] = csfrToken;

  function handleLogout(e) {
    e.preventDefault();
    logoutUser(tokenValue)
      .then(() => {
        setTokenValue(null);
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
          <ButtonNormal hidden={!tokenValue} onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} /><p>Log out</p>
          </ButtonNormal>
        </ButtonPanelDiv>
      </HeadderWrapper>
    </>
  );
};

export default Header;
