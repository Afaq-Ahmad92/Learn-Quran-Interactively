import React from 'react';
import { ContextProvider } from '../Global/Context';
import '../Styling_Sheets/NavBar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/image/logo.jpg';
const Navbar = () => {
  const { user, Account_type, userProfile, logOut } =
    React.useContext(ContextProvider);
  const userLogOut = () => {
    logOut();
  };

  return (
    <div className="NavBar">
      <div className="NavBar_Container">
        <div className="navLeft">
          <a href="/">
            <img src={logo} alt="centerLogo" className="centerLogo" />
          </a>
          <h2 className="heading">
            Learn Quran Online Interactively
          </h2>
        </div>
        <div className="navRight">
          <a className="navRight_link" href="/">
            Home
          </a>
          {user &&
            Account_type == 'teacher' &&
            (userProfile ? (
              <Link className="navRight_link" to="/createprofile">
                Edit Profile
              </Link>
            ) : (
              <Link className="navRight_link" to="/createprofile">
                Create Profile
              </Link>
            ))}
          <Link className="navRight_link" to="/Available_teacher">
            Available Teacher
          </Link>
          {user && (
            <a
              className="navRight_link"
              href="/"
              onClick={userLogOut}
            >
              Log Out
            </a>
          )}

          <button className="navRight_btn">Download App</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
