import styled, { keyframes } from "styled-components";

const backgroundColor = "#e09500b0";

const boxesTextColor = "#000000";
const boxesBackgroundColor = "#ffffff";

const boxesShadow = "0 0.3rem 0.3rem 0.03rem #35353533";

const confirmColor = "#409640";
const warnColor = "#ea3d3d";

const buttonNormalBorder = "0.005rem solid" + boxesTextColor;
const buttonNormalHoverBorder = buttonNormalBorder;
const buttonNormalBackgroundColor = boxesBackgroundColor;
const buttonNormalColor = boxesTextColor;

const butonNormalHoverBackgroundColor = backgroundColor;
const butonNormalHoverColor = boxesTextColor;

const buttonWarnBorder = "0.005rem solid" + warnColor;
const buttonWarnHoverBorder = "0.005rem solid" + warnColor;
const buttonWarnBackgroundColor = boxesBackgroundColor;
const buttonWarnColor = warnColor;

const buttonWarnHoverBackgroundColor = warnColor;
const buttonWarnHoverColor = "#fff";

const dishHoverBackgroundColor = backgroundColor;

//---General---

export const ButtonNormal = styled.button`
  /* align-self: center; */
  display: inline-block;
  outline: none;
  color: ${buttonNormalColor};
  background-color: ${buttonNormalBackgroundColor};
  padding: 0.5em 1em;
  margin: 0.5em;
  border: ${buttonNormalBorder};
  border-radius: 0.5em;
  font-size: 0.8rem;
  box-shadow: 0px 0.1rem #363535;
  transition: 0.5s;
  :hover {
    color: ${butonNormalHoverColor};
    background-color: ${butonNormalHoverBackgroundColor};
    border: ${buttonNormalHoverBorder};
    cursor: pointer;
  }
  :active{
    transition: 0.1s;
    box-shadow: 0px 0px;
    transform: translateY(2px); //sinkable button
  }
  :disabled{
    color: #bababa;
    :hover {
      background-color: ${buttonNormalBackgroundColor};
      box-shadow: 0px 0.1rem;
      transition: 0s;
    }
    
    :active {transform: translateY(0px)}
  }
`;

export const ButtonWarn = styled(ButtonNormal)`
  color: ${buttonWarnColor};
  background-color: ${buttonWarnBackgroundColor};
  border: ${buttonWarnBorder};
  box-shadow: 0px 0.2rem ${warnColor};
  :hover {
    color: ${buttonWarnHoverColor};
    background-color: ${buttonWarnHoverBackgroundColor};
    border: ${buttonWarnHoverBorder};
    cursor: pointer;
  }
`;

export const FormDiv = styled.div`
  margin: 0;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-self: center;
  border-radius: 1rem;
  width: 50%;
  background-color: ${boxesBackgroundColor};
  
`;

export const FormFieldNameLabel = styled.label` //Forms
  display: flex;
  flex-direction: column;
  height: auto;
  color: ${boxesTextColor};
  p {
    margin: 0;
  }
`;

export const FromErrorLabel = styled.label`
  font-size: 0.8em;
  color: #ff0000a2;
`;

export const InputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;

  input,
  textarea,
  select {
    padding: 5px 5px;
    margin: 0;
    box-sizing: border-box;
    border-bottom: 0.2rem solid ${backgroundColor};
    border-right: 0.01rem none;
    border-left: none;
    border-top: none;
    outline: none;
    border-radius: 0.4rem;
    background-color: #eeeeee;
    :hover{
      border-bottom: 0.2rem solid ${backgroundColor};
    }

    :active{
      border-bottom: 0.2rem solid ${backgroundColor};
      border-right: 0.01rem none;
      border-left: none;
      border-top: none;
      outline: none;
    }
  }
`;

//---Index---

export const IndexWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${backgroundColor};
  height: inherit;
`;

//---App---

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.4rem;
  height: 100vh;
  /* width: 70%; */
  /* align-items: center; */

  @media (max-width: 600px) {
    margin: 0 0.3rem;

  }
  `;

//---Login---

export const FormLoginDiv=styled(FormDiv)`  
  border-radius: 0.5rem;
  width: fit-content;
  position: absolute;
  top: 20%;
  padding: 1rem;
  svg {
    height: 3rem;
  }
  h2 {
    text-align: center;
  }

`;

export const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
`;

export const LoginButtonGroupDiv=styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.8rem;
  svg {
    height: 0.8rem;
  }
`;

export const ButtonLogin=styled(ButtonNormal)`
  margin: 0;
  width:fit-content;
`;

//---BussinessInformationCard---


  export const BusinessCardInformationDiv = styled.div`
    align-self: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    @media only screen and (max-width: 690px) {
      order: 3;
  }
    
  `;

  export const BussinessInformationCardDetail = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    @media only screen and (max-width: 690px) {
      padding: 0;
  }
  `;

  export const BussinessInformationCardDetailItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    svg {
      color: ${backgroundColor};
      border-width: 0.5rem;
      border-color: black;
    }
    p {
      padding: 0;
      margin: 0;
    }
  `;

  export const BussinessName = styled.h1`
    text-shadow: -0.05rem 0.05rem 0 ${backgroundColor};
    box-shadow: 0px 0.1rem ${backgroundColor};
  `;

//---Header---

export const HeadderWrapper = styled.header`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  align-items: baseline;
  background-color: ${boxesBackgroundColor};
  color: ${boxesTextColor};
  padding: 0 0.5rem 0.5rem 0.5rem;
  width: inherit;
  border-radius: 0em 0em 1em 1em;
  box-shadow: ${boxesShadow};
  
  @media only screen and (max-width: 690px) {
    flex-flow: column;
    gap: 0.5rem;
  }

`;

export const ImageDiv = styled.div`
  box-sizing: border-box;
  width: 20%;
  img {
    width: 100%;
    border-radius: 0em 0em 1em 1em;
  }
  align-self: baseline;

  @media only screen and (max-width: 690px) {
    order: 2;
    align-self: center;
    img {
      width: 100%;
      border-radius: 3rem;
  }
   
  }
`;


export const ButtonPanelDiv = styled.div`
  display: flex;
  flex-direction:column;
  width: 20%;
  height:100%;
  padding: 0;
  border-radius: 2em;
  align-self: center;
  justify-content: space-between;
  align-items: center;
  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      padding: 0;
      margin: 0;
    }
  }
  @media only screen and (max-width: 690px) {
    height: auto;
    width:auto;
    order: 1;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    button {
      margin: 0 1rem;
      padding: 0.2rem 1rem;
      height: min-content;
      justify-content: center;
      border-radius: 0em 0em 1em 1em;
      p {
        display: none;
      }
    }
    
      
    
  }
`;

//---UserInformation---

export const UserInformationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  align-items: center;
  width: min-content;
  padding: 0 0.5rem;
  margin: 0;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: lightgreen;
  p{
    margin:0;
  }

  @media only screen and (max-width: 690px) {
    width: auto;
    flex-direction: row;
    justify-content: baseline;
  }
`;


//---ToolBar---

export const ToolBarWrapper = styled.nav`
  padding: 0.5em 0.5em;
  display: block;
  border-radius: 0.5em;
  background-color: ${boxesBackgroundColor};
  box-shadow: ${boxesShadow};
`;

//---DishList---

export const DishListContentWrapper = styled.div`
  padding: 0em 0em;
  flex: 1;
  background-color: ${boxesBackgroundColor};
  color: ${boxesTextColor};
  overflow-y: auto;
  border-radius: 1em 1em 0em 0em;
  box-shadow: ${boxesShadow};
  transition: 0.5s;
  @media (max-width: 600px) {
    margin: 0;

  }
`;

//---Category---




export const DishListWrapper = styled.div`
  gap: 1rem;
  box-sizing: border-box;
  align-self: center;
  
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* border-radius: 1rem;
  border-style: solid;
  border-width: 0 0 0.02rem 0; */
  height: 100%;
  width: 100%;
`;

export const CategoryButton = styled(ButtonNormal)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  /* align-self: center; */

  p {
    display: inherit;
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }
`;

export const ButtonEditCategory = styled(ButtonNormal)`
  height: 100%;
  /* width: 10%; */
  box-sizing: border-box;
  align-self: center;
`;

export const ButtonDeleteCategory = styled(ButtonWarn)`
  height: 100%;
  /* width: 10%; */
  align-self: center;
`;

//---Dish---

const display = keyframes`

  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.85;
  }
`;

export const DishWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  opacity: 0.85 ;
  animation: ${display} 0.3s ease-in;
  
  p {
    margin: 0;
  }
  :hover {
    transition: 0.2s linear;
    opacity: 1;
    background-color: ${dishHoverBackgroundColor};
  }
`;

export const DishImageDiv = styled.div`
  max-width: 15%;
  height: auto;
`;

export const DishImage = styled.img`
  max-width: 100%;
  aspect-ratio: 1/1;
  float: left;
  padding: 0.5em;
  border-radius: 2em;
  box-sizing: border-box;
  align-self: center;
`;
export const DishDescriptionWrapper = styled.div`
  height: 100%;
  width: 75%;
  box-sizing: border-box;
  align-self: center;
`;
export const DishPriceCurrencyWrapper = styled.div`
  height: 100%;
  width: 10%;
  box-sizing: border-box;
  align-self: center;
`;

export const DishEditButton = styled(ButtonNormal)`
  height: 100%;
  /* width: 10%; */
  box-sizing: border-box;
  align-self: center;
`;

export const DishDeleteButton = styled(ButtonWarn)`
  height: 100%;
  /* width: 10%; */
  box-sizing: border-box;
  align-self: center;
`;

//---Modal---

const started = keyframes`    
  from {opacity: 0;} 
  to {opacity: 1;}
`;

export const ModalBackArea = styled.div`
  width: 100%;
  background: #ffffff88;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999999999;
`;

export const ModalArea = styled.div`
  max-width: 90%;
  background: ${boxesBackgroundColor};
  position: relative;
  width: max-content;
  top: 50%;
  padding: 0;
  margin: auto;
  box-sizing: border-box;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  animation: ${started} 500ms normal;
  -webkit-box-shadow: 0 0 10px 0px #000000;
  box-shadow: 0 0 10px 0px #000000;
  border-radius: 1rem 1rem 1rem 1rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  top: 0;
  left: 0;
  z-index: 1;
  border-style: solid;
  border-width: 0rem 0rem 0.1rem 0rem;

  @media only screen and (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Title = styled.p`
  display: flex;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  align-self: center;
  margin: 0;
`;

export const BtnClose = styled(ButtonNormal)`
  margin: 0;
`;

//---CategoryForm---

export const FormDishCategoryDiv = styled(InputsDiv)`
  /* display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  background: ${boxesBackgroundColor};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999999999; */
`;

export const FormDishCategory = styled.form`
  margin: 0;
  padding: 1em;
  align-content: center;
`;

export const ButtonCreateEdit = styled(ButtonNormal)`
  margin: 1em 0;
  :hover {
    background-color: ${confirmColor};
  }
`;



//---DishForm---

export const ButtonDiv = styled.div`
  button {
    margin: 0;
    align-self: center;
    color: white;
    background-color: #325891;
    padding: 0.5em 1.3em;
    margin: 1em 0em;
    border-style: none;
    border-radius: 0.3em;
    border: none;
    font-size: 1rem;
    height: auto;
    :hover {
      background-color: #3865ad;
      cursor: pointer;
    }
  }
`;

export const ImageForm = styled.img`
  width: 15rem;
  height: 15rem;
  padding: 5px 5px;
  margin: 0;
  border: 0 solid #ccc;
  border-radius: 1em;
  box-sizing: border-box;
  align-content: center;
  @media only screen and (max-width: 768px) {
    width: 10rem;
    height: 10rem;
    gap: 0;
  }
  @media only screen and (max-width: 580px) {
    width: 8rem;
    height: 8rem;
  }
`;

export const ImageFormLabel = styled.label`

`;

export const ImageFormButtonLabel = styled.label`
  display: flex;
  gap: 0.3rem;
  outline: none;
  color: ${buttonNormalColor};
  background-color: ${buttonNormalBackgroundColor};
  padding: 0.5em 1em;
  margin: 0.5em;
  border: ${buttonNormalBorder};
  border-radius: 0.5em;
  font-size: 0.8rem;
  box-shadow: 0px 0.1rem #363535;
  transition: 0.5s;
  :hover {
    color: ${butonNormalHoverColor};
    background-color: ${butonNormalHoverBackgroundColor};
    border: ${buttonNormalHoverBorder};
    cursor: pointer;
  }
  :active{
    transition: 0.1s;
    box-shadow: 0px 0px;
    transform: translateY(2px); //sinkable button
  }
  :disabled{
    color: #bababa;
    :hover {
      background-color: ${buttonNormalBackgroundColor};
      box-shadow: 0px 0.1rem;
      transition: 0s;
    }
    
    :active {transform: translateY(0px)}
  }
  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
  p {
    align-self: center;
    margin: 0;
  }
`;

export const ImageInput = styled.input`
  height:0;
  opacity: 0;
  width: 0;
`;

export const SelectImageInformationLable = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 10rem;
label {
  align-self: center;
  text-align: center;
}
svg {
  height: 2rem;
}
`;

export const ImageFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: #7f9ccb;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px ridge black;
    font-size: 0.8rem;
    height: auto;
  }
`;


//text and image form container
export const FormDishDiv = styled.div`
  display: flex;
  flex-flow: row;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  /* padding: 20px 20px; */
  background: inherit;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999999999;

  @media only screen and (max-width: 500px) {
    height: fit-content;
    flex-direction: column;
    flex-flow: column-reverse;
    gap: 0;
    
  }
`;

export const FormDish = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1em;
  /* max-width: 80%; */
  height: fit-content;

  @media only screen and (min-width: 768px) {
    .FormDiv {
      flex-direction: row;
    }
  }

  .InputsDiv .ImageFormDiv {
    flex-basis: 100%;
    margin: 10px;
  }

  @media only screen and (min-width: 768px) {
    .InputsDiv .ImageFormDiv {
      flex-basis: 50%;
    }
  }
`;


//---Toast---

export const Toast = styled.div`
  display: flex;
  width: fit-content;
  position: fixed;
  bottom: 20px;
  left: 50%;
  margin-top:0;
  margin-bottom:0;
  padding: 0em 1em;
  transform: translateX(-50%);
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  color: #050000;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  opacity: 0.9;
  background-color: ${(props) => {
    switch (props.type) {
      case "success":
        return "#17a45c";
      case "error":
        return "#ed5e5e";
      case "information":
        return "#e0cb54";
      default:
        return "#325891";
    }
  }};
  p{
    margin:0;
    padding: 0.5rem;
    }
`;
