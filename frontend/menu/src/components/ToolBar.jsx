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
import {ButtonNormal, ToolBarWrapper, } from "../styles/css"
import { useTranslation } from 'react-i18next';
import { interpolate } from '../utils/utils'

const ToolBar = () => {
  const { t } = useTranslation();

  const { key, csfrToken } = useContext(Context);
  const [dishCategories, setDishCategories] = useContext(CategoriesContext);
  const [, setToastVisible, , setToastMessage, , setToastType,] = useContext(ToastVisibilityContext);
  const [userLoggedKey] = key;
  const [csfrTokenValue] = csfrToken;

  const newDishHook = useModal(t("dish"));
  const newDishCategoryHook = useModal(t("category"));

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

    createDish(payload, userLoggedKey, csfrTokenValue)
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
        
        const nameCreated = {nameCreated: data.name}
        const createdToastMessageTemplate = t('createdToastMessageTemplate')
        const displayToastMessage = interpolate(createdToastMessageTemplate, nameCreated)

        displayToast(
          displayToastMessage,
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
    createDishCategory(payload, userLoggedKey, csfrTokenValue)
      .then((data) => {

        if (data.Error) {
          throw data;
        }
        return data;
      })
      .then((data) => {

        const nameCreated = {nameCreated: data.name}
        const createdToastMessageTemplate = t('createdToastMessageTemplate')
        const displayToastMessage = interpolate(createdToastMessageTemplate, nameCreated)

        const newCategory = [data];
        setDishCategories([...dishCategories, ...newCategory]);
        newDishCategoryModal();
        displayToast(
          displayToastMessage,
          "success"
        );
      })
      .catch((data) => {
        displayToast(data, "error");
      });
  };

  return (
    <>
        {userLoggedKey? 
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
            { t('addDish') }
        </ButtonNormal>
        <ButtonNormal onClick={newDishCategoryModal}>
        { t('addCategory') }
        </ButtonNormal>
        </ToolBarWrapper>) : (<></>)}
    </>
    )

}

export default ToolBar;