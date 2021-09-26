import React from 'react';
import PropTypes from 'prop-types';
import './header.scss'
import {Link} from 'react-router-dom';
import {User} from "../../features/Profile/user";

interface HeaderProps {
   currentUser: User | null
   doLogout: Function
}



function Header(props: HeaderProps) {
   const {currentUser, doLogout} = props

   const handleLogout = () => {
      if(doLogout){
         doLogout()
      }
   }

   const renderElement = () => {
      if(currentUser?.userId){
         return(
            <span>
               <Link className="header__link" to="/profile">Profile</Link>
               <button  onClick={handleLogout}>Logout</button>
            </span>
         )
      }else{
         return(
            <Link className="header__link" to="/login">Login</Link>
         )
      }
   }


   return (
      <div className="header">
         <Link className="header__link" to="/home">Home</Link>
         <Link className="header__link" to="/posts">Posts</Link>
         {renderElement()}
      </div>
   );
}

export default Header;
