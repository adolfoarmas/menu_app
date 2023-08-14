import React, { useEffect, useState, useContext } from "react";
import ModalHook, { useModal } from "../hooks/modalHook";
import DishForm from "./forms/DishForm";
import { CategoriesContext, Context, ToastVisibilityContext } from "../context/userContext";
import editDish from "../services/dish/editDish";
import deleteDish from "../services/dish/deleteDish.js";
import ConfirmationYesNo from "./popups/ConfirmationYesNo";
import {DishWrapper, DishImage, DishDescriptionWrapper, DishPriceCurrencyWrapper, DishEditButton, DishDeleteButton, DishImageDiv} from "../styles/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { interpolate } from '../utils/utils'

const DishItem = (props) => {
  const { t } = useTranslation();
  const { key, csfrToken } = useContext(Context);
  const [ , setToastVisible, , setToastMessage, , setToastType] = useContext(ToastVisibilityContext)
  const [dishCategories, ] = useContext(CategoriesContext)
  // const [dishes, setDishes] = useContext(DishesContext);
  const [userLoggedKey] = key;
  const [csfrTokenValue] = csfrToken;
  let [dish, setDish] = useState({});
  const [confirmationModalMessage, setConfirmationMessage] = useState('')
  const editDishHook = useModal(t('dish'));
  const confirmationModal = useModal(t('confirmToDeletePopUpTitle'));

  const editDishModal = () => {
    editDishHook.changeShow();
  };
 
  const onDeleteDish = () => {
    const toDelete = {"toDelete" : dish.name}
    const sureDeleteConfirmationTemplate = t('sureDeleteConfirmationTemplate')
    const sureDeleteConfirmationMessage = interpolate(sureDeleteConfirmationTemplate, toDelete)
    setConfirmationMessage(sureDeleteConfirmationMessage)
    confirmationModal.changeShow();
  } 
  
  const onConfirmation = (confirmation) => {
    confirmation ? onConfirmateDeleteDish() : onDeleteDish();
  }

  const onConfirmateDeleteDish = () => {
    deleteDish(dish.id, userLoggedKey, csfrTokenValue)
    .then(data => {
      if(data.Error){
        throw data
      }
      return data
    })
    .then(() => {
      const nameDeleted = {nameDeleted : dish.name}
      const deletedToastMessageTemplate = t('deletedToastMessageTemplate')
      const displayToastMessage = interpolate(deletedToastMessageTemplate, nameDeleted)
      const categorySelected = dishCategories.find(obj => obj.id === dish.category)
      const dishesOfCategorySelected = categorySelected['dishes']
      const indexToEdit = dishesOfCategorySelected.indexOf(dish)
      categorySelected['dishes'].splice(indexToEdit, 1) //modifies existing array
      setDish(null)
      displayToast(displayToastMessage, 'success')
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
    
  }, []);

  //TO REFACTOR: Unify with onSubmit DishForm in DishList.jsx page
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

    editDish(payload, formData.id, userLoggedKey, csfrTokenValue)
    .then(data => {
      if(data.Error){
        throw data
      }
      return data
    })
    .then((data) => {
      const nameEdited = {nameEdited : data.name}
      const editedToastMessageTemplate = t('editedToastMessageTemplate')
      const displayToastMessage = interpolate(editedToastMessageTemplate, nameEdited)
      setDish(data);
      editDishModal()
      displayToast(displayToastMessage, 'success')
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
          content={<DishForm data={dish} onSubmit={ onSubmit } />}
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
        {userLoggedKey && <>
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