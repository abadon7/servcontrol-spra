import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebaseInit";

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    const changeUser = userdata => {
        setCurrentUser(userdata);
    };

    const logout = () => {
        console.log("Callign from auth");
        auth.signOut().then(() => {
            changeUser(null);
        });
    };
    const login = cb => {
        console.log("Callign from auth");
        auth.signInWithPopup(provider).then(result => {
            changeUser(result);
            setTimeout(cb, 10);
        });
    };

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setPending(false);
        });
    }, []);

    if (pending) {
        return <>Loading...</>;
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
