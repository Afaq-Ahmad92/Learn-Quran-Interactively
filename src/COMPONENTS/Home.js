import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pd_img_1 from '../assets/image/hp1.jpg';
import { ContextProvider } from '../Global/Context';
import Page_Detail from './Page_Detail';
import '../Styling_Sheets/Home.css';
const Home = () => {
  const { user, Loader, Account_type, userProfile } =
    React.useContext(ContextProvider);

  console.log(user);
  console.log(Account_type);

  const checkUser = () => {
    return !Loader && user ? (
      !Loader && Account_type == 'teacher' ? (
        <div className="UserCategory">
          <h3 style={{ marginRight: '5%', marginTop: '20px' }}>
            Now, you can {userProfile ? 'edit' : 'create'} your
            profile
          </h3>
          {userProfile ? (
            <Link className="link" to="/createprofile">
              <button className="btn">Edit Profile</button>
            </Link>
          ) : (
            <Link className="link" to="/createprofile">
              <button className="btn">Create Profile</button>
            </Link>
          )}
        </div>
      ) : (
        !Loader &&
        Account_type == 'student' && (
          <div className="UserCategory">
            <h3 style={{ marginRight: '5%' }}>
              You can search avaible teacher from here
            </h3>
            <Link className="link" to="/Available_teacher">
              <button className="btn">Available Teacher</button>
            </Link>
          </div>
        )
      )
    ) : (
      <span>........</span>
    );
  };

  return (
    <div className="Home">
      <Page_Detail
        h3_1=""
        h1="The Prophet Muhammad ( ﷺ ) said:"
        h3_2="The most superior among you (Muslims) are those who learn the Qur'an
				and teach it."
        p="	[ Sahih Al-Bukhari : 5027 ]"
        img={pd_img_1}
      />

      {checkUser()}

      {!user && (
        <div className="UserCategory">
          <Link className="link" to="/Authorization/student">
            <button
              className="btn btnLeft"
              style={{ marginRight: '20px' }}
            >
              Are You Student?
            </button>
          </Link>
          <Link className="link" to="/Authorization/teacher">
            <button className="btn">Are You Teacher?</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
