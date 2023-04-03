import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { UserInformationWrapper } from "../styles/css";

const UserInformation = (props) => {
  return (
    <UserInformationWrapper>
      <FontAwesomeIcon icon={faCircleUser} />
      <p>{props.userName}</p>
    </UserInformationWrapper>
  );
};

export default UserInformation;
