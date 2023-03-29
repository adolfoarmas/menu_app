import styled from "styled-components";
import React, { useEffect, useContext } from "react";
import DishForm from "./forms/DishForm";
import DishCategoryForm from "./forms/DishCategoryForm";
import {
  CategoriesContext,
  Context,
  ToastVisibilityContext,
} from "../context/userContext";
import ModalHook, { useModal } from "../hooks/modalHook";
import createDishCategory from "../services/dishCategory/createDishCategory";
import createDish from "../services/dish/createDish";
import {ButtonNormal, ToolBarButton, ToolBarWrapper, } from "../styles/css"

const ToolBar = () => {
  const { token, csfrToken } = useContext(Context);
  const [dishCategories, setDishCategories] = useContext(CategoriesContext);
  const [toastVisible, setToastVisible, toastMessage, setToastMessage, toastType, setToastType,] = useContext(ToastVisibilityContext);
  const [tokenValue] = token;
  const [csfrTokenValue] = csfrToken;

  const newDishHook = useModal("Dish");
  const newDishCategoryHook = useModal("Dish Category");

  const newDishModal = () => {
    newDishHook.changeShow();
  };

  const newDishCategoryModal = () => {
    newDishCategoryHook.changeShow();
  };

  const displayToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  useEffect(() => {}, [dishCategories]);

  //TO REFACTOR: Unify with onSubmit in DishItem.jsx component
  const onSubmitNewDish = (formData) => {
    let payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("category", JSON.parse(formData.category));
    payload.append("observation", formData.observation);
    payload.append("image", formData.image);
    payload.append("price", formData.price);
    payload.append("currency", formData.currency);
    payload.append(
      "created_by",
      JSON.parse(window.localStorage.getItem("logedUserId"))
    );

    createDish(payload, tokenValue, csfrTokenValue)
      .then((data) => {
        // console.log(data)
        if (data.Error) {
          throw data;
        }
        return data;
      })
      .then((data) => {
        const categoryId = data.category;
        const updatedCategories = dishCategories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                dishes: [...category.dishes, data.url],
              }
            : category
        );
        setDishCategories(updatedCategories);
        newDishModal();
        displayToast(
          'Dish "' + String(data.name) + '" has been created!',
          "success"
        );
      })
      .catch((data) => {
        displayToast(data, "error");
      });
  };

  //TO REFACTOR: Unify with onSubmit in CategoryItem.jsx component
  const onSubmitNewDishCategory = (formData) => {
    let payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append(
      "created_by",
      JSON.parse(window.localStorage.getItem("logedUserId"))
    );
    createDishCategory(payload, tokenValue, csfrTokenValue)
      .then((data) => {
        // console.log(data)
        if (data.Error) {
          throw data;
        }
        return data;
      })
      .then((data) => {
        // console.log(data)
        const newCategory = [data];
        setDishCategories([...dishCategories, ...newCategory]);
        newDishCategoryModal();
        displayToast(
          'Category "' + String(data.name) + '" has been created!',
          "success"
        );
      })
      .catch((data) => {
        displayToast(data, "error");
      });
  };

  return (
    <>
        {tokenValue? 
            (<ToolBarWrapper>
        <ModalHook
            modalHook={newDishHook}
            content={
            <DishForm
                onSubmit={onSubmitNewDish}
                dishCategories={dishCategories}
            />
            }
        />
        <ModalHook
            modalHook={newDishCategoryHook}
            content={<DishCategoryForm onSubmit={onSubmitNewDishCategory} />}
        />
        <ButtonNormal onClick={newDishModal}>
            + Add Dish
        </ButtonNormal>
        <ButtonNormal onClick={newDishCategoryModal}>
            + New Dish Category
        </ButtonNormal>
        </ToolBarWrapper>) : (<></>)}
    </>
    )

}

export default ToolBar;