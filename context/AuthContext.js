'use client'
import { auth } from "@/config/firebaseConfig";
import { browserLocalPersistence, onAuthStateChanged, setPersistence, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";


const toggleNavigation = () => {
    setIsNavigationVisible((prev) => !prev);
};

// Create Auth context
const AuthContext = createContext();

// Custom hook to access Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isNavigationVisible, setIsNavigationVisible] = useState(true);

    useEffect(() => {
        // Set persistence for the session (Local persistence keeps the user logged in even after page reload)
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                // Monitor Auth state changes
                onAuthStateChanged(auth, (user) => {
                    setUser(user);
                    setLoading(false);
                });
            })
            .catch((error) => {
                console.error("Error setting persistence:", error);
                setLoading(false);
            });
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Clear user state after logout
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };


    const toggleNavigation = () => {
        setIsNavigationVisible((prev) => !prev);
    };

    if (loading) {
        return <div>Loading...</div>; // Loading indicator while checking auth status
    }

    return (
        <AuthContext.Provider value={{ user, logout, toggleNavigation, isNavigationVisible }}>
            {children}
        </AuthContext.Provider>
    );
};
