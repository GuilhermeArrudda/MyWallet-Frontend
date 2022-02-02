import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/reset.css"
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import UserContext from "./contexts/UserContext";


export default function App() {
    const [userData, setUserData] = useState(null);
    return (
        <UserContext.Provider value={{userData, setUserData}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignInPage/>}></Route>
                    <Route path="/sign-up" element={<SignUpPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
};