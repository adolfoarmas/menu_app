import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import getDishes from "../services/dish/getDish";
import DishCategoryForm from "./forms/DishCategoryForm";
import DishItem from "./DishItem";
import ModalHook, { useModal } from "../hooks/modalHook";
import deleteDishCategory from "../services/dishCategory/deleteDishCategory.js";
import { CategoriesContext, Context, ToastVisibilityContext, DishesContext } from "../context/userContext";
import editDishCategory from "../services/dishCategory/editDishCategory";
import ConfirmationYesNo from "./popups/ConfirmationYesNo";
import { ButtonDeleteCategory, ButtonEditCategory, CategoryButton, CategoryWrapper, DishListWrapper, } from "../styles/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';


const CategoryItem = ({ data }) => {
  const { token, csfrToken } = useContext(Context);
  const [dishCategories, setDishCategories] = useContext(CategoriesContext);
  const [dishes, setDishes] = useState([]);
  const [toastVisible, setToastVisible, toastMessage, setToastMessage, toastType, setToastType] = useContext(ToastVisibilityContext)

  const [tokenValue] = token;
  const [csfrTokenValue] = csfrToken;

  const [dishesVisible, setDishesVisible] = useState(false);
  // const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState(data)
  const [confirmationModalMessage, setConfirmationMessage] = useState('')

  const editDishCategoryModal = useModal("Dish Category");
  const confirmationModal = useModal("Confirm delete category");

  const onEditDishCategoryModal = () => {
    editDishCategoryModal.changeShow();
  };
  
  const onDeleteDishCategory = () => {
    setConfirmationMessage('Are you sure you want to delete the category?')
    confirmationModal.changeShow();
  } 

  const onConfirmation = (confirmation) => {
    confirmation ? onConfirmateDeleteDishCategory() : onDeleteDishCategory();
  }


  const onConfirmateDeleteDishCategory = () => {
    deleteDishCategory(category.id, tokenValue, csfrTokenValue)
    .then(data => {
      // console.log(data)
      if(data.Error){
        throw data
      }
      return data
    })
    .then(() => {
      const nameDeleted = category.name
      const indexToEdit = dishCategories.indexOf(category)
      dishCategories.splice(indexToEdit, 1) //modifies existing array
      setDishCategories(dishCategories)
      displayToast('Category "' + String(nameDeleted) + '" has been deleted!', 'success')
      confirmationModal.changeShow();
    })
    .catch(data => {
      displayToast(data, 'error')
    })
  };

  const getDishesService = async (cat) => {
    const apiDishes = await getDishes(cat)
    setDishes(apiDishes)
  };

  const displayToast = (message, type) => {
    setToastMessage(message)
    setToastType(type)
    setToastVisible(true)
  }

  useEffect(() => {
    getDishesService(category);
  }, [dishCategories]);

  //TO REFACTOR: Unify with onSubmitNewDishCategory in DishList.jsx page
  const onSubmit = (formData) => {
    let payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("created_by", JSON.parse(window.localStorage.getItem("logedUserId"))
    );

    editDishCategory(payload, formData.id, tokenValue, csfrTokenValue)
    .then(data => {
      // console.log(data)
      if(data.Error){
        throw data
      }
      return data
    })
    .then((data) => {
      const editedCategory = data;
      setCategory(editedCategory)
      const indexToEdit = dishCategories.indexOf(category)
      dishCategories.splice(indexToEdit, 1, editedCategory) //modifies existing array
      setDishCategories(dishCategories)
      onEditDishCategoryModal()
      displayToast('Category "' + String(data.name) + '" has been edited!', 'success')
    })
    .catch(data => {
      displayToast(data, 'error')
    })
  };

  return (
    <>
      <CategoryWrapper>
        <CategoryButton onClick={() => setDishesVisible(!dishesVisible)}>
          <div></div>
          <p>{category.name}</p>
          {dishesVisible ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}

        </CategoryButton>

        {tokenValue && <><ButtonEditCategory
          onClick={onEditDishCategoryModal}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </ButtonEditCategory>

        <ButtonDeleteCategory
          onClick={onDeleteDishCategory}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </ButtonDeleteCategory></>}
      </CategoryWrapper>

      <DishListWrapper>
        <ModalHook
          modalHook={editDishCategoryModal}
          content={<DishCategoryForm data={category} onSubmit={onSubmit} />}
        />
        <ModalHook
          modalHook={confirmationModal}
          content={
            <ConfirmationYesNo
              message={confirmationModalMessage}
              onConfirmation={onConfirmation}
            />
          }
        />

        {dishes &&
          dishes.map((dish, id) => (
            <DishItem key={id} visible={dishesVisible} dish={dish} />
          ))}
      </DishListWrapper>
    </>
  );
};

export default CategoryItem;