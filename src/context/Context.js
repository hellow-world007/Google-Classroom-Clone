import React, { createContext, useContext, useState } from "react";
import { auth, provider } from "../library/firebase";

// import { auth, googleProvider } from "../library/firebase";
// import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect } from "react";

export const AppContext = createContext(null);

export function useContextAPI(){
  return useContext(AppContext)
}

export const AppContextProvider = ({ children }) => {
    
  const [show, setShow] = useState(false)
  const [createClass, setCreateClass] = useState(false)
  const [createClassDisplay, setCreateClassDisplay] = useState(false)
  const [joinClassDisplay, setJoinClassDisplay] = useState(false)
  const [classworkDisplay, setClassworkDisplay] = useState(false)

  const [showPopup, setShowPopup] = useState(false)

  const [ loginUser, setLoginuser ] = useState(null)
  const [ loginMail, setLoginMail ] = useState(null)

  const [ classworks, setClassworks ] = useState([]);
  
  // const login = () => {
  //   auth.signInwithPopup(googleProvider)
  // }
  // const signInWithGoogle = async () => {
  //   try {
  //     await signInWithPopup(auth,googleProvider);
  //   } catch (err){
  //     console.error(err);
  //   }
  // };

  // const logOut = async () => {
  //   try {
  //   await signOut(auth);
  //   } catch (err){
  //     console.error(err);
  //   }
  // };

  const signInWithGoogle = () => auth.signInWithPopup(provider);

  const logOut = () => auth.signOut();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        setLoginMail(authUser.email)
        setLoginuser(authUser)
      }else{
        setLoginMail(null)
        setLoginuser(null)
      }
    })

    return () => unsubscribe();
  },[loginMail])

  const value = {
      show, 
      setShow,
      createClass, 
      setCreateClass,
      createClassDisplay, 
      setCreateClassDisplay,
      joinClassDisplay, 
      setJoinClassDisplay,
      signInWithGoogle, 
      logOut,
      loginUser,
      loginMail,
      classworkDisplay, 
      setClassworkDisplay,
      showPopup, setShowPopup,
      classworks, setClassworks
  };
  
    return (
      <AppContext.Provider value={value}> 
        {children} 
      </AppContext.Provider>
    );
  };