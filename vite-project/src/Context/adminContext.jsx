import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";





export const AdminContext = createContext();


export const AdminProvider = ({ children }) => {

    const [admin, setadmin] = useState({})

    let token = admin?.data?.token

    if (token) {
        try {
            let decodedToken = jwtDecode(token);
            localStorage.setItem("admin", JSON.stringify(decodedToken))
        } catch (err) {
            console.error("Token decode failed:", err);
        }
    }







    return <AdminContext.Provider value={{ admin, setadmin }}>{children}</AdminContext.Provider>




}


