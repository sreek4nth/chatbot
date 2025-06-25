import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import { AppContext } from '../context/AppContext';

const UserProfile = () => {
    const [userData, setUser] = useState(null);
    const { backendurl, setIsLoggedin, getUserdata } = useContext(AppContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${backendurl}/api/user/data`, { withCredentials: true });
                setUser(res.data.userData);
            } catch (error) {
                console.error('Error fetching profile:', error.response?.data?.message || error.message);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div>
            <div className="top-0 left-0 w-full z-20">
                <Navbar />
            </div>
            <div className='bg-gray-700'>
                {userData ? <Profile fullname={userData.fullname} email={userData.email} /> : <p>Loading profile...</p>}
            </div>
        </div>
    );
};

export default UserProfile;
