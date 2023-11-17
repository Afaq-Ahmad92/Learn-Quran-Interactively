import React, { useState, useEffect, useContext } from 'react';
import { db } from '../Database/firebase';
import { ContextProvider } from '../Global/Context';
import { Link } from 'react-router-dom';
import '../Styling_Sheets/Available_Qaris.css';
const Available_Qaris = () => {
  /* Use states */
  const [QarisProfile, setQarisProfile] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [FilterState, setFilterState] = useState('fname');
  const [AllProfiles, setAllProfiles] = useState(true);
  const [ResultFounds, setResultFounds] = useState(0);
  const [SearchBtnClicked, setSearchBtnClicked] = useState(false);
  console.log(FilterState);

  const { userID } = React.useContext(ContextProvider);

  /* Fetch all Qaris from database */
  useEffect(() => {
    db.collection('available_courses')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        setQarisProfile(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  /* To change state when user select categorgy for filter data */
  const changeFilterState = (e) => {
    setFilterState(e.target.value);
    setAllProfiles(false);
    setSearchInput('');
  };

  /* Filter data Function*/
  const filterdata = (e) => {
    e.preventDefault();
    /* Filter Profiles store in filteredQarisProfiles  */
    const filteredQarisProfiles = QarisProfile.filter(({ data }) => {
      switch (FilterState) {
        case 'age':
          return data[FilterState] == searchInput;
        case 'course_fee':
          return (
            Number.parseInt(data[FilterState]) <=
            Number.parseInt(searchInput)
          );
        default:
          return (
            data[FilterState].toLowerCase() ==
            searchInput.toLowerCase()
          );
      }
    });
    console.log(filteredQarisProfiles);
    setQarisProfile(filteredQarisProfiles);
    setSearchBtnClicked(true);
    setResultFounds(filteredQarisProfiles.length);
  };
  console.log(QarisProfile);

  return (
    <div className="Qaris">
      <div className="page_upperContainer">
        <div className="upperContainer_left">
          {/* Search Form */}
          <form className="Search_form" onSubmit={filterdata}>
            <input
              className="search_input"
              placeholder={
                AllProfiles == true
                  ? 'You can Search Qaris profile by their Name '
                  : ' Seacrh Qari by ' + FilterState
              }
              type="text"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              onInput={() => filterdata()}
              required
              value={searchInput}
            />
            <input
              className="submit_btn"
              type="submit"
              value="Search"
            />
          </form>

          <div className="filterContainer">
            {/* Filter Option */}
            <div className="FilterQaris_Option">
              <button
                value="all_profiles"
                className={
                  AllProfiles == true
                    ? 'FitlerBtnActive'
                    : 'FilterDataBtn'
                }
                onClick={() => setAllProfiles(true)}
              >
                All Profiles
              </button>
              <button
                value="fname"
                className={
                  FilterState == 'fname' && AllProfiles == false
                    ? 'FitlerBtnActive'
                    : 'FilterDataBtn'
                }
                onClick={changeFilterState}
              >
                Name
              </button>
              <button
                value="gender"
                className={
                  FilterState == 'gender' && AllProfiles == false
                    ? 'FitlerBtnActive'
                    : 'FilterDataBtn'
                }
                onClick={changeFilterState}
              >
                Gender
              </button>
              <button
                value="course_language"
                className={
                  FilterState == 'course_language' &&
                  AllProfiles == false
                    ? 'FitlerBtnActive'
                    : 'FilterDataBtn'
                }
                onClick={changeFilterState}
              >
                Language
              </button>
              <button
                value="city"
                className={
                  FilterState == 'city' && AllProfiles == false
                    ? 'FitlerBtnActive'
                    : 'FilterDataBtn'
                }
                onClick={changeFilterState}
              >
                City
              </button>
              <button
                value="age"
                className={
                  FilterState == 'age' && AllProfiles == false
                    ? 'FitlerBtnActive'
                    : 'FilterDataBtn'
                }
                onClick={changeFilterState}
              >
                Age
              </button>
              <button
                value="course_fee"
                className={
                  FilterState == 'course_fee' && AllProfiles == false
                    ? 'FitlerBtnActive'
                    : 'FilterDataBtn'
                }
                onClick={changeFilterState}
              >
                Fee
              </button>
            </div>
            <p>
              ---You can filter Qaris profile by selecting above
              option---
            </p>
          </div>
        </div>
      </div>

      {SearchBtnClicked == true ? (
        <p className="resultFound">
          {' '}
          {ResultFounds} Qari's Profile is Found
        </p>
      ) : (
        <p></p>
      )}
      {/*  Show all Qaris Profile */}
      <div className="allQaris">
        {QarisProfile.map(({ id, data }) => (
          <Link
            to={`/qariDetail/${id}`}
            className="qariContainer_Link"
            key={id}
          >
            <div className="Qaris__container" key={id}>
              <div className="Qaris_container_upper">
                <img
                  src={data.profileImage}
                  alt="Qari Pic"
                  className="Qari_image"
                />
                <h3 className="Qari_name">
                  {`${data.fname} ${data.Lname}`}{' '}
                </h3>
                <pre className="age_gender">
                  {data.gender} | {data.age} year old
                </pre>
              </div>
              <div className="Qaris_Container_lower">
                <h3 className="provided_course">
                  I want to teach course of {data.course_title}
                </h3>
                <pre className="address">From {data.city}</pre>
                <h3 className="education">
                  I did {data.qualification}
                </h3>
                <p className="langauge">
                  I will teach in {data.course_language}
                </p>
                <div className="feeContianer">
                  <h2 className="fee">{data.course_fee}</h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Available_Qaris;
