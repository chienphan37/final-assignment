import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {User} from "./user";
import userApi from "../../api/userApi";

interface Profile {
   currentUserId: number | null
}


function Profile(props: Profile) {

   const {currentUserId} = props
   const [profile, setProfile] = useState<User | null>(null);
   const [isLoading, setIsloading] = useState(false);
   const [error, setError] = useState('');


   useEffect(() => {
      let didCancel = false;
      if (currentUserId != null) {
         setIsloading(true)
         userApi.get(currentUserId).then((res: any) => {
            if (!didCancel) {
               setIsloading(false)
               setProfile(res);
            }

         }).catch(() => {
            if (didCancel) {
               setIsloading(false)
               setError(error)
            }
         })
      }

      return () => {
         didCancel = true;
      }
   }, [currentUserId]);
   if (isLoading) {
      return <div>Loading</div>
   }
   if (error) {
      return <div>Error</div>
   }
   return (
      <div>
         <h3>Profile</h3>
         <div>UserId: {profile?.id}</div>
         <div>Name: {profile?.name}</div>
      </div>
   );
}

export default Profile;

