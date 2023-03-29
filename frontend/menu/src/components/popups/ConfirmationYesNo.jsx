import styled from "styled-components";
import React, { useState, useContext } from "react";

import { Context } from "../../context/userContext";
import { useEffect } from "react";
import { ButtonNormal, ButtonWarn } from "../../styles/css";

const ConfirmationYesNo = ({message, onConfirmation}) => {
    //const { token, csfrToken, userLoggedId } = useContext(Context);

  useEffect(() => {
    
  });

  const handleConfirmation = async (event, confirmation) => {
    event.preventDefault();
    onConfirmation(confirmation);
  };
  
  return (
    <FormDiv >
        <div>  
            <p>{message}</p>
        </div>
        <ButtonDiv>
            <ButtonWarn onClick={(e) => handleConfirmation(e, true)} type="submit">Yes</ButtonWarn>
       
            <ButtonNormal onClick={(e) => handleConfirmation(e, false)} type="reset">No</ButtonNormal>
        </ButtonDiv>
    </FormDiv>
  );
};

export default ConfirmationYesNo;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999999999;
`;