import React from "react"; 
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types"; 

//Crear el contexto
const UserContext = createContext();

//Permite traer la info del usuario sin importar la página
export const useUser = () => useContext(UserContext);

//envolver App.js en el contexto para tener los datos del usuario en cualquier página
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    //buscar los datos del admin (id, rol, email) del backend
    const fetchUserData = async () => {
        const token = Cookies.get("token");
        if (!token) {
            setUser(null);
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/admin-info/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos del usuario");
            }

            const data = await response.json();
            setUser({ email: data.email, id: data.idadmin, role: "admin" }); //setea el usuario con el rol admin
        } catch (error) {
            console.error("Error:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
