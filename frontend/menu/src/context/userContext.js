import React, { createContext, useEffect, useState } from "react";
// import getDishCategories from "../services/dishCategory/getDishCategories";
import {DISH_CATEGORIES} from "../services/settings"
import { fetchData } from "../services/fetchData";

const Context = createContext({})
const CategoriesContext = createContext({})
const UpdateViewContext = createContext({})
const ToastVisibilityContext = createContext({})
const DishesContext = createContext({})


// const apiData = fetchData(DISH_CATEGORIES);

const fetchCategories = fetchData(DISH_CATEGORIES) 

const UserContextProvider = ({ children }) => {

    const apiData = fetchCategories;
    const dishCategoriesApi = apiData.read();

    const [userLogged, setUserLogged] = useState(null)
    const [csrfToken, setCsrfToken] = useState(null)
    const [userLoggedId, setUserLoggedId] = useState(null)
    const [userLoggedName, setUserLoggedName] = useState(null)
    const [updateView, setUpdateView] = useState(1)
    const [dishCategories, setDishCategories] = useState(dishCategoriesApi)
    const [dishes, setDishes] = useState([])
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState('')
    
    useEffect(() => {        
        const getUserLoggedTokenValue = () => {
          return window.localStorage.getItem('logedUserToken')
        }

        const getCsrftokenValue = () => {
          return document.cookie
                .split('; ')
                .find((row) => row.startsWith('csrftoken='))
                ?.split('=')[1];
        // 
        }

        const getUserLoggedId = () => {
          return window.localStorage.getItem('logedUserId')
        }

        const getUserLoggedName = () => {
            return window.localStorage.getItem('logedUserName')
          }



        if(getUserLoggedTokenValue) {
          setUserLogged(getUserLoggedTokenValue)
          setCsrfToken(getCsrftokenValue)
          setUserLoggedId(getUserLoggedId)
          setUserLoggedName(getUserLoggedName)
          //console.log('token', userLogged, 'csfrtoken', csrfToken)
        }
        
        const apiData = fetchCategories;
        const dishCategoriesApi = apiData.read();
        setDishCategories(dishCategoriesApi)

      }, [])   

    return (
    
      <Context.Provider value={{'token':[userLogged, setUserLogged], 'csfrToken': [csrfToken, setCsrfToken], 'userLoggedId': [userLoggedId, setUserLoggedId], 'userLoggedName': [userLoggedName, setUserLoggedName]}}>
        <CategoriesContext.Provider value={[dishCategories, setDishCategories]}>
          <UpdateViewContext.Provider value={[updateView, setUpdateView]}>
            <ToastVisibilityContext.Provider value={[toastVisible, setToastVisible, toastMessage, setToastMessage, toastType, setToastType]}>
                <DishesContext.Provider value={[dishes, setDishes]}>
            {/*user state sent as Context value parameter*/}
            {children}
                </DishesContext.Provider>
            </ToastVisibilityContext.Provider>
          </UpdateViewContext.Provider>
        </CategoriesContext.Provider>
      </Context.Provider>
      
      )
}

export { Context, CategoriesContext, UpdateViewContext, ToastVisibilityContext, DishesContext, UserContextProvider }