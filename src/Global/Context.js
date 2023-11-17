import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { auth } from '../Database/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { compose } from '@mui/system';
export const ContextProvider = createContext();
const Context = (props) => {
  const [user, setUser] = useState(null);
  const [userID, setuserID] = useState(null);
  const [Account_type, setAccount_type] = useState(null);
  const [Loader, SetLoader] = useState(false);
  const [EmailVerified, setEmailVerified] = useState();
  const [AccountRegisterClick, setAccountRegisterClick] =
    useState(false);
  const [userProfile, setUserProfile] = useState();

  const Register = async (user, userType) => {
    const { email, password } = user;
    try {
      const Respond = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await Respond.user.updateProfile({
        displayName: userType,
      });

      await Respond.user.sendEmailVerification();
      setAccountRegisterClick(true);
    } catch (error) {
      var errorMessage = error.message;
      alert('Account not created!!' + errorMessage);
    }
  };

  const UserLogin = async (user) => {
    const { email, password } = user;
    try {
      //Sign In User with Email and Password
      const res = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log(res);
      setAccountRegisterClick(true);
    } catch (error) {
      alert(error.message);
    }
  };

  React.useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      setEmailVerified(user.emailVerified);
      console.log(user.emailVerified);
      console.log(user);

      if (user && user.emailVerified) {
        setEmailVerified(user.emailVerified);
        SetLoader(false);
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });
  }, [EmailVerified == true, Account_type]);

  console.log(EmailVerified);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userProviderData = async () => {
        await user.providerData.forEach((profile) => {
          setEmailVerified(profile.emailVerified);
          console.log(profile.emailVerified);
          setuserID(profile.uid);
          setAccount_type(profile.displayName);
          console.log(profile.displayName);
        });
      };

      userProviderData();
    }
  }, [user, EmailVerified == true]);

  console.log(user);
  useEffect(() => {
    const userProfileData = async () => {
      if (user) {
        await firebase
          .firestore()
          .collection('available_courses')
          .doc(`${userID}`)
          .get()
          .then((snap) => {
            if (snap) {
              setUserProfile(snap.data());
            }
          });
      }
    };

    userProfileData();
  }, [user]);

  console.log(user);
  console.log(Account_type);
  console.log(EmailVerified);
  console.log(userProfile);

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        setAccount_type(null);
        setUserProfile(null);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <ContextProvider.Provider
        value={{
          Register,
          UserLogin,
          user,
          Loader,
          Account_type,
          userID,
          userProfile,
          logOut,
          EmailVerified,
          AccountRegisterClick,
        }}
      >
        {props.children}
      </ContextProvider.Provider>
    </>
  );
};

export default Context;
