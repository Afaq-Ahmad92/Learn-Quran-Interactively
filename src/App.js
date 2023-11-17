import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* Components import */
import Home from './COMPONENTS/Home';
import Navbar from './COMPONENTS/Navbar';
import CreateProfile from './COMPONENTS/CreateProfile';
import Authorization from './COMPONENTS/Authorization';
import LoadingPage from './COMPONENTS/LoadingPage';
import Available_Qaris from './COMPONENTS/Available_Qaris';
import QariDetail from './COMPONENTS/QariDetail';
import Context from './Global/Context';
import { ContextProvider } from './Global/Context';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return !loading ? (
    <Context>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/Available_teacher"
            element={<Available_Qaris />}
          />
          <Route
            exact
            path="/Authorization/:AccountType"
            element={<Authorization />}
          />
          <Route
            exact
            path="/createprofile"
            element={<CreateProfile />}
          />
          <Route
            exact
            path="/qariDetail/:qariId"
            element={<QariDetail />}
          />
        </Routes>
      </BrowserRouter>
    </Context>
  ) : (
    <LoadingPage
      firstHeading="A platform for everyone"
      secondHeading="Learn Quran Online Interactively"
      thirdHeading="There is no God excep ALLAH and Prophet MUHAMMAD ( ﷺ ) is the last
		Messenger and Servant of ALLAH"
    />
  );
};

export default App;
