import React from "react";
import {
  BusinessCardInformationDiv,
  BussinessInformationCardDetail,
  BussinessInformationCardDetailItem,
  BussinessName,
} from "../styles/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faClock,
  faLocationDot,
  faMotorcycle,
} from "@fortawesome/free-solid-svg-icons";

//TO REFACTOR: Read bussiness information from API.
const BussinessInformationCard = () => {
  return (
    <BusinessCardInformationDiv>
      <BussinessName>Smoker Grills</BussinessName>
      <BussinessInformationCardDetail>
        <BussinessInformationCardDetailItem>
          <FontAwesomeIcon icon={faPhoneAlt} />
          <p> +1 234 567 89</p>
        </BussinessInformationCardDetailItem>
        <BussinessInformationCardDetailItem>
          <FontAwesomeIcon icon={faClock} />
          <p> Open - 24 Hours</p>
        </BussinessInformationCardDetailItem>
        <BussinessInformationCardDetailItem>
          <FontAwesomeIcon icon={faMotorcycle} />
          <p> Free with orders over 15$ (7:00 to 11:00 p.m.)</p>
        </BussinessInformationCardDetailItem>
        <BussinessInformationCardDetailItem>
          <FontAwesomeIcon icon={faLocationDot} />
          <p> 91 All Fooldon St, Brooklyn, NY 11201-1322</p>
        </BussinessInformationCardDetailItem>
      </BussinessInformationCardDetail>
    </BusinessCardInformationDiv>
  );
};

export default BussinessInformationCard;
