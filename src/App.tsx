import React, {Suspense, useState} from 'react';
import './App.scss';
import {BrowserRouter, Redirect, Route, Switch, useHistory} from "react-router-dom";

import Header from "./components/Header";
import NotFound from './components/NotFound';
import Home from "./features/Home";
import Post from "./features/Post";
import PostDetail from "./features/PostDetail";
import Profile from "./features/Profile";
import Login from "./features/Login";
import {User} from "./features/Profile/user";


function App() {

   const [currentUser, setCurrentUser] = useState<User | null>(null);
   const doLogin = (user: User) => {
      setCurrentUser(user)


   }
   const doLogout = () => {
      setCurrentUser(null)
   }
   return (
      <div className="app-wrapper">
         <Suspense fallback={<div> Loading.... </div>}>
            <BrowserRouter>
               <Header currentUser={currentUser} doLogout={doLogout}/>
               <Switch>
                  <Redirect exact from="/" to="/home"/>
                  <Route path="/home" exact> <Home/></Route>
                  <Route path="/posts" exact> <Post/></Route>
                  <Route path="/posts/:id" exact> <PostDetail/></Route>
                  <Route path="/profile">
                     {currentUser?.userId && <Profile currentUserId={currentUser.userId} />}
                     {!currentUser?.userId && <Login doLogin={doLogin}/>}
                  </Route>
                  <Route path="/login" exact><Login doLogin={doLogin}/> </Route>
                  <Route component={NotFound}></Route>
               </Switch>

            </BrowserRouter>
         </Suspense>
      </div>
   );
}

export default App;
