import React, { useState, useEffect } from 'react';
import { ContextProvider } from '../Global/Context';
import { Link } from 'react-router-dom';
import { db } from '../Database/firebase';
import { useParams } from 'react-router-dom';
const QariDetail = () => {
  const { userID } = React.useContext(ContextProvider);
  const [QarisProfile, setQarisProfile] = useState([]);

  const { qariId } = useParams();
  /* Fetch all Qaris from database */
  useEffect(() => {
    db.collection('available_courses')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setQarisProfile(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="QariDetail">
        {QarisProfile.map(({ id, data }) =>
          id == qariId ? (
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
          ) : (
            ''
          )
        )}
      </div>
    </div>
  );
};

export default QariDetail;
