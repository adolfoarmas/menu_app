import React from "react";
import DishList from "./pages/DishList";
import UserLogin from "./pages/UserLogin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import { UserContextProvider, } from './context/userContext';
import ToolBar from './components/ToolBar';
import { AppWrapper } from './styles/css';

const App = () =>    
{ 
return (
  <AppWrapper>
    <UserContextProvider>
    
        <Router>
            <Routes>
                <Route path="/" element={
                <>
                <Header />
                <ToolBar />
                <DishList />
                </>
                } />
                <Route path="/login" element={<UserLogin />} />
            </Routes>
        </Router>
    </UserContextProvider>
  </AppWrapper> 
)}

export default App;