import styled from "styled-components";
import React, { useEffect, useContext, Suspense } from "react";
import CategoryItem from "../components/CategoryItem";
import { CategoriesContext, ToastVisibilityContext } from "../context/userContext";
import ToastMessage from "../components/ToastMessage";
import { DishListContentWrapper } from "../styles/css";

const DishList = () => {
  const [dishCategories, setDishCategories] = useContext(CategoriesContext);
  const [toastVisible, setToastVisible, toastMessage, setToastMessage, toastType, setToastType] = useContext(ToastVisibilityContext)


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
      <Suspense fallback={<div>Loading...</div>}>
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

