import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/reset.css"
import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import NewBankOperationPage from "./components/NewBankOperationPage";
import UserContext from "./contexts/UserContext";

export default function App() {
    const [userData, setUserData] = useState(null);
   
    useEffect(() => {
        const localUserData = localStorage.getItem("userData");
        if(localUserData) {
            setUserData(JSON.parse(localUserData));
        } else {
            setUserData('');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/sign-up" element={<SignUpPage/>}></Route>
                    <Route path="sign-in" element={<SignInPage/>}></Route>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/new/:type" element={<NewBankOperationPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
};