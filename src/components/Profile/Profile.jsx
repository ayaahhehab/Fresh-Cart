import React, { useContext, useEffect } from 'react';
import Style from './Profile.module.css';
import { jwtDecode } from "jwt-decode";
import { UserContext } from '../../Context/UserContext';
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const { userData } = useContext(UserContext);

  // useEffect(() => {
  //   const encodedToken = localStorage.getItem('userToken');
  //   if (encodedToken) {
  //     jwtDecode(encodedToken); // You can use this decoded data if needed
  //   }
  // }, []);

  return (
    <div className={Style.profileContainer}>
      <div className={Style.profileCard}>
        <div className={Style.avatarWrapper}>
          <FaUserCircle className={Style.avatarIcon} />
        </div>
        <h2 className={Style.userName}>Hello, {userData?.name}!</h2>
        <p className={Style.userEmail}>{userData?.email}</p>
      </div>
    </div>
  );
}
