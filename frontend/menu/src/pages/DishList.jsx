import styled from "styled-components";
import React, { useEffect, useContext, Suspense } from "react";
import CategoryItem from "../components/CategoryItem";
import { CategoriesContext, ToastVisibilityContext } from "../context/userContext";
import ToastMessage from "../components/ToastMessage";
import { DishListContentWrapper } from "../styles/css";
import { useTranslation } from 'react-i18next';


const DishList = () => {

  const { t } = useTranslation();

  const [dishCategories, ] = useContext(CategoriesContext);
  const [toastVisible, , toastMessage, , toastType, ] = useContext(ToastVisibilityContext)


  useEffect(() => {}, [dishCategories]);

  return (
    <DishListContentWrapper>
      <div>
      {toastVisible && (
        <ToastMessage
          message={toastMessage}
          type={toastType}
          duration={3000}
        />
      )}
    </div>
      <Suspense fallback={<div>{t('loading')}</div>}>
        <CategoiesDiv>
          {dishCategories?.map((category, index) => (
            <>
              <CategoryItem key={index} data={category} />
            </>
          ))}
        </CategoiesDiv>
      </Suspense>
    </DishListContentWrapper>
  );
};

export default DishList;

const CategoiesDiv = styled.div``;

