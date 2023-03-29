import styled from "styled-components";
import React, { useEffect, useState, useContext } from "react";
import ModalHook, { useModal } from "../hooks/modalHook";
import NewDish from "./forms/DishForm";
import { CategoriesContext, Context, DishesContext, ToastVisibilityContext } from "../context/userContext";
import editDish from "../services/dish/editDish";
import deleteDish from "../services/dish/deleteDish.js";
import ConfirmationYesNo from "./popups/ConfirmationYesNo";
import {DishWrapper, DishImage, DishDescriptionWrapper, DishPriceCurrencyWrapper, DishEditButton, DishDeleteButton, DishImageDiv} from "../styles/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const DishItem = (props) => {

  const { token, csfrToken } = useContext(Context);
  const [toastVisible, setToastVisible, toastMessage, setToastMessage, toastType, setToastType] = useContext(ToastVisibilityContext)
  const [dishCategories, setDishCategories] = useContext(CategoriesContext)

  const [dishes, setDishes] = useContext(DishesContext);

  const [tokenValue] = token;
  const [csfrTokenValue] = csfrToken;

  let [dish, setDish] = useState({});
  const [confirmationModalMessage, setConfirmationMessage] = useState('')

  const editDishHook = useModal("Dish");
  const confirmationModal = useModal("Confirm delete dish");

  const onConfirmation = (confirmation) => {
    confirmation ? onConfirmateDeleteDish() : onDeleteDish();
  }
  
  const onDeleteDish = () => {
    confirmationModal.changeShow();
  } 

  const editDishModal = () => {
    editDishHook.changeShow();
  };

  const onConfirmateDeleteDish = () => {
    deleteDish(dish.id, tokenValue, csfrTokenValue)
    .then(data => {
      // console.log(data)
      if(data.Error){
        throw data
      }
      return data
    })
    .then(() => {
      const nameDeleted = dish.name
      const categorySelected = dishCategories.find(obj => obj.id === dish.category)
      const dishesOfCategorySelected = categorySelected['dishes']
      const indexToEdit = dishesOfCategorySelected.indexOf(dish)
      categorySelected['dishes'].splice(indexToEdit, 1) //modifies existing array
      console.log("dishCategories", dishCategories)
      setDish(null)
      displayToast('Category "' + String(nameDeleted) + '" has been deleted!', 'success')
      onDeleteDish()

    })
    .catch(data => {
      displayToast(data, 'error')
    })
  };

  const displayToast = (message, type) => {
    setToastMessage(message)
    setToastType(type)
    setToastVisible(true)
  }

  useEffect(() => {
    setDish(props.dish);
    setConfirmationMessage('Are you sure you want to delete the category?')
  }, [dishCategories]);

  //TO REFACTOR: Unify with onSubmitNewDish in DishList.jsx page
  const onSubmit = (formData) => {
    let payload = new FormData();

    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("category", JSON.parse(formData.category));
    payload.append("observation", formData.observation);
    if (typeof formData.image != "string") {
      payload.append("image", formData.image);
    }
    payload.append("price", formData.price);
    payload.append("currency", formData.currency);
    payload.append(
      "created_by",
      JSON.parse(window.localStorage.getItem("logedUserId"))
    );

    editDish(payload, formData.id, tokenValue, csfrTokenValue)
    .then(data => {
      // console.log(data)
      if(data.Error){
        throw data
      }
      return data
    })
    .then((data) => {
      setDish(data);
      editDishModal()
      displayToast('Dish "' + String(data.name) + '" has been edited!', 'success')
    })
    .catch(data => {
      displayToast(data, 'error')
    })
  };

  if(props.visible && dish){
    return (
        
        <DishWrapper>
        <ModalHook
          modalHook={editDishHook}
          content={<NewDish data={dish} onSubmit={onSubmit} />}
        />
        <ModalHook
          modalHook={confirmationModal}
          content={<ConfirmationYesNo message={confirmationModalMessage} onConfirmation={onConfirmation} />}
        />
        <DishImageDiv>
          <DishImage src={dish.image} alt={dish.name} />
        </DishImageDiv>
        <DishDescriptionWrapper>
          <h3>{dish.name}</h3>
          <p>
            <em>{dish.description}</em>
          </p>
        </DishDescriptionWrapper>
        <DishPriceCurrencyWrapper>
          <p>
            {dish.currency} {dish.price}
          </p>
        </DishPriceCurrencyWrapper>
        {tokenValue && <>
        <DishEditButton onClick={editDishModal}>
        <FontAwesomeIcon icon={faPenToSquare} />
        </DishEditButton>
        <DishDeleteButton onClick={onDeleteDish}>
        <FontAwesomeIcon icon={faTrashCan} />
        </DishDeleteButton>
        </>
        }
      </DishWrapper>
    );
  }
}

export default DishItem;