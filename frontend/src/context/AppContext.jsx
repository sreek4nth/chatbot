import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;

    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    // Function to fetch user data
    const getUserdata = async () => {
        try {
            const { data } = await axios.get(`${backendurl}/api/user/data`, { withCredentials: true });
    
            if (data.success) {
                setUserData(data.userData);
                setIsLoggedin(true);
                localStorage.setItem("isLoggedin", "true");  // ✅ Store for better UX
            } else {
                setIsLoggedin(false);
                localStorage.removeItem("isLoggedin");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setIsLoggedin(false); 
            setUserData(null);
            localStorage.removeItem("isLoggedin");  // ✅ Clear outdated state
        }
    };
    
    useEffect(() => {
        getUserdata();  // ✅ Always check login state on page load
    }, []);
    

    // Restore login state on page load
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem("isLoggedin") === "true";
        if (storedLoginStatus) {
            getUserdata();
        }
    }, []);  // ✅ Empty dependency array ensures it runs once on mount

    const handleLoginSuccess = () => {
        setIsLoggedin(true);
        localStorage.setItem("isLoggedin", "true");  // ✅ Save state to persist on refresh
    };

    const logoutUser = async () => {
        try {
            await axios.post(`${backendurl}/api/auth/logout`, {}, { withCredentials: true });
            setUserData(null);
            setIsLoggedin(false);
            localStorage.removeItem("isLoggedin");  
            navigate("/");
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Failed to log out. Try again.");
        }
    };

    const value = {
        backendurl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserdata,
        logoutUser
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
