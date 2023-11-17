import React, { useState } from 'react';
import { ContextProvider } from '../Global/Context';
import upload_img from '../assets/image/upload_logo.jpg';
import firebase from 'firebase/compat/app';
import { db } from '../Database/firebase';
/* import ProgressBar from 'react-bootstrap/ProgressBar'; */
import '../Styling_Sheets/CreateProfile.css';
import '../Styling_Sheets/Authorization.css';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const Profile = () => {
  const { user, userID, userProfile } =
    React.useContext(ContextProvider);
  const [step, setStep] = useState(1);
  const [submitProfile, setSubmitProfile] = useState(false);
  const [image, setImages] = useState([]);
  const [remImage, setRemImage] = useState(false);
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  const [Inputs, setInputs] = useState({
    fname: userProfile ? userProfile.fname : '',
    Lname: userProfile ? userProfile.Lname : '',
    age: userProfile ? userProfile.age : '',
    city: userProfile ? userProfile.city : '',
    gender: userProfile ? userProfile.gender : '',
    country: userProfile ? userProfile.country : '',
    contact: userProfile ? userProfile.contact : '',
    profileImage: userProfile ? userProfile.profileImage : '',
    frontCnic: userProfile ? userProfile.frontCnic : '',
    backCnic: userProfile ? userProfile.backCnic : '',
    sanadImage: userProfile ? userProfile.sanadImage : '',
    cnic_no: userProfile ? userProfile.cnic_no : '',
    course_title: userProfile ? userProfile.course_title : '',
    course_language: userProfile ? userProfile.course_language : '',
    course_fee: userProfile ? userProfile.course_fee : '',
    courseDuration: userProfile ? userProfile.courseDuration : '',
    degreeName: userProfile ? userProfile.degreeName : '',
    instituteName: userProfile ? userProfile.instituteName : '',
    degreeStartingDate: userProfile
      ? userProfile.degreeStartingDate
      : '',
    degreeEndingDate: userProfile ? userProfile.degreeEndingDate : '',
    experience: userProfile ? userProfile.experience : '',
    detail: userProfile ? userProfile.detail : '',
  });

  const InputHandeler = (e) => {
    const { name, value } = e.target;

    if (name == 'profileImage') {
      if (e.target.files && e.target.files.length > 0) {
        setInputs({
          ...Inputs,
          profileImage: e.target.files[0],
        });
        const newImage = e.target.files[0];
        setImages([...image, { id: 'profileImage', img: newImage }]);
        newImage['id'] = 'profileImage';
        setImages((preState) => [...preState, newImage]);
      }
    } else if (name == 'sanadImage') {
      if (e.target.files && e.target.files.length > 0) {
        setInputs({
          ...Inputs,
          sanadImage: e.target.files[0],
        });
        const newImage = e.target.files[0];
        newImage['id'] = 'sanadImage';
        setImages((preState) => [...preState, newImage]);
      }
    } else if (name == 'frontCnic') {
      if (e.target.files && e.target.files.length > 0) {
        setInputs({
          ...Inputs,
          frontCnic: e.target.files[0],
        });
        const newImage = e.target.files[0];
        newImage['id'] = 'frontCnic';
        setImages((preState) => [...preState, newImage]);
      }
    } else if (name == 'backCnic') {
      if (e.target.files && e.target.files.length > 0) {
        setInputs({
          ...Inputs,
          backCnic: e.target.files[0],
        });
        const newImage = e.target.files[0];
        newImage['id'] = 'backCnic';
        setImages((preState) => [...preState, newImage]);
      }
    } else {
      setInputs({
        ...Inputs,
        [name]: value,
      });
    }
  };

  const removeSelectedImage = () => {
    setInputs({
      ...Inputs,
      profileImage: '',
    });
    setRemImage(true);
  };

  const nextStep = () => {
    if (formValidation1(Inputs) == true) {
      setStep(2);
    }
  };

  console.log(submitProfile);

  const SubmitProfile = (event) => {
    event.preventDefault();

    if (formValidation2(Inputs) == true) {
      const storage = getStorage();

      const storageRef = ref(
        storage,
        `images/${Inputs.profileImage.name}`
      );
      const uploadTask = uploadBytesResumable(
        storageRef,
        Inputs.profileImage
      );

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            db.collection('available_courses').doc(`${userID}`).set({
              timestamp:
                firebase.firestore.FieldValue.serverTimestamp(),
              fname: Inputs.fname,
              Lname: Inputs.Lname,
              age: Inputs.age,
              city: Inputs.city,
              gender: Inputs.gender,
              contact: Inputs.contact,
              country: Inputs.country,
              cnic_no: Inputs.cnic_no,
              course_title: Inputs.course_title,
              course_language: Inputs.course_language,
              course_fee: Inputs.course_fee,
              courseDuration: Inputs.courseDuration,
              degreeName: Inputs.degreeName,
              instituteName: Inputs.instituteName,
              degreeStartingDate: Inputs.degreeStartingDate,
              degreeEndingDate: Inputs.degreeEndingDate,
              experience: Inputs.experience,
              detail: Inputs.detail,
              profileImage: url,
            });
          });
        }
      );
      if (Inputs?.sanadImage) {
        const storageRef2 = ref(
          storage,
          `images/${Inputs.sanadImage.name}`
        );
        const uploadTask2 = uploadBytesResumable(
          storageRef2,
          Inputs.sanadImage
        );

        uploadTask2.on(
          'state_changed',
          () => {},
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask2.snapshot.ref).then((url) => {
              db.collection('sanadImage').doc(`${userID}`).set({
                sanadImage: url,
              });
            });
          }
        );
      }

      if (Inputs?.frontCnic) {
        const storageRef3 = ref(
          storage,
          `images/${Inputs.frontCnic.name}`
        );
        const uploadTask3 = uploadBytesResumable(
          storageRef3,
          Inputs.frontCnic
        );

        uploadTask3.on(
          'state_changed',
          () => {},
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask3.snapshot.ref).then((url) => {
              db.collection('frontCnic').doc(`${userID}`).set({
                frontCnic: url,
              });
            });
          }
        );
      }

      if (Inputs?.backCnic) {
        const storageRef4 = ref(
          storage,
          `images/${Inputs.backCnic.name}`
        );
        const uploadTask4 = uploadBytesResumable(
          storageRef4,
          Inputs.backCnic
        );

        uploadTask4.on(
          'state_changed',
          () => {},
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask4.snapshot.ref).then((url) => {
              db.collection('backCnic').doc(`${userID}`).set({
                backCnic: url,
              });
            });
          }
        );
      }

      alert(`Your Profile has been Uploaded`);
    }
  };

  console.log(Inputs);

  function formValidation1(Inputs) {
    var cnic_pattern = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
    if (Inputs.profileImage == '') {
      setError('Kindly Choose Profile Image');
      return false;
    } else if (Inputs.fname == '') {
      setError('Kindly Enter your First Name');
      return false;
    } else if (Inputs.lname == '') {
      setError('Kindly Enter your last Name');
      return false;
    } else if (Inputs.age == '') {
      setError('Kindly Enter Age');
      return false;
    } else if (Inputs.contact == '') {
      setError('Kindly Enter Gmail or Mobible No');
      return false;
    } else if (Inputs.cnic_no == '') {
      setError('Kindly Enter Cnic No');
      return false;
    } else if (Inputs.gender == '') {
      setError('Kindly Enter gender');
      return false;
    } else if (Inputs.city == '') {
      setError('Kindly Enter Your City Name');
      return false;
    } else if (Inputs.contact == '') {
      setError('Kindly Enter Your Country Name');
      return false;
    } else if (Inputs.age.length > 3) {
      setError(
        'Age might be wrong!Age length must be lesser than 100'
      );
      return false;
    } else if (Inputs.age.value <= 0) {
      setError('Age must be greater than 0');
      return false;
    } else if (Inputs.gender == '') {
      setError('Kindly select gender!');
      return false;
    } else if (!cnic_pattern.test(Inputs.cnic_no)) {
      setError('Cnic Format is incorrect! i.e XXXX-XXXXXXX-X');
      return false;
    }

    return true;
  }

  console.log(Inputs.progress);

  function formValidation2(Inputs) {
    if (Inputs.course_title == '') {
      setError2('Kindly enter Course Title');
      return false;
    } else if (Inputs.course_language == '') {
      setError2('Kindly Enter Course Language');
      return false;
    } else if (Inputs.courseDturation == '') {
      setError2('Kindly Enter Course Duration');
      return false;
    } else if (Inputs.course_fee == '') {
      setError2('Kindly Enter Course Fee');
      return false;
    } else if (Inputs.degreeName == '') {
      setError2('Kindly Enter Degree Name');
      return false;
    } else if (Inputs.instituteName == '') {
      setError2('Kindly Enter Institute Name');
      return false;
    } else if (Inputs.degreeStartingDate == '') {
      setError2('Kindly Enter Degree Starting Date');
      return false;
    } else if (Inputs.degreeEndingDate == '') {
      setError2('Kindly Enter Degree Ending Date');
      return false;
    } else if (Inputs.experience == '') {
      setError2('Kindly Add Your Experience');
      return false;
    } else if (Inputs.sanadImage == '' || Inputs.sanadImage == null) {
      setError2('Kindly choose Sanad Image');
      return false;
    } else if (Inputs.frontCnic == '' || Inputs.frontCnic == null) {
      setError2('Kindly choose Fron Cnic Image');
      return false;
    } else if (Inputs.backCnic == '' || Inputs.backCnic == null) {
      setError2('Kindly choose Back Cnic Image');
      return false;
    } else if (Inputs.detail == '') {
      setError2('Kindly say something about course etc');
      return false;
    }

    return true;
  }

  return (
    <div className="CreateProfile">
      <div className="form_body">
        {step == 1 ? (
          <div className="" onSubmit={nextStep}>
            <div className="form_step">
              <div className="inputImage_container">
                <input
                  type="file"
                  name="profileImage"
                  onChange={InputHandeler}
                  className="inputImage"
                  id="file-input"
                />

                {Inputs.profileImage != '' ? (
                  <div className="image_show">
                    <div className="img_container">
                      <img
                        className="selectedImg"
                        src={
                          userProfile
                            ? remImage == false
                              ? userProfile.profileImage
                              : URL.createObjectURL(
                                  Inputs.profileImage
                                )
                            : URL.createObjectURL(Inputs.profileImage)
                        }
                        alt="Thumb"
                      />
                    </div>

                    <button
                      onClick={removeSelectedImage}
                      className="removeImgBtn"
                    >
                      Remove This Image
                    </button>
                  </div>
                ) : (
                  <label for="file-input">
                    <img className="upload_img" src={upload_img} />
                  </label>
                )}
                {Inputs.profileImage != '' ? (
                  ''
                ) : (
                  <label for="file-input">
                    <p className="image_heading">
                      Choose Profile Image
                    </p>
                  </label>
                )}
              </div>

              <div className="profile_title">
                <h2>
                  {userProfile ? 'Edit' : 'Create'} Your Profile
                </h2>
                <p>Personal Detail</p>
                <p>Step {step} of 2</p>
              </div>
            </div>

            <div
              className="form_step_btm"
              style={{ marginTop: '6vh' }}
            >
              <div className="form_step_left">
                <label htmlFor="firstName" className="input_label">
                  Enter your First Name
                </label>
                <input
                  type="text"
                  value={Inputs.fname}
                  onChange={InputHandeler}
                  name="fname"
                  id="firstName"
                  className="input_field"
                  required
                />
              </div>
              <div className="form_step_right">
                <label htmlFor="firstName" className="input_label">
                  Enter your Last Name
                </label>
                <input
                  type="text"
                  value={Inputs.Lname}
                  onChange={InputHandeler}
                  name="Lname"
                  id="firstName"
                  className="input_field"
                  required
                />
              </div>
            </div>

            <div className="form_step_btm">
              <div className="form_step_left">
                <label htmlFor="age" className="input_label">
                  Enter your Age
                </label>
                <input
                  type="number"
                  value={Inputs.age}
                  onChange={InputHandeler}
                  id="age"
                  name="age"
                  className="input_field"
                  required
                />
              </div>
              <div className="form_step_right">
                <label htmlFor="contact" className="input_label">
                  Enter Gmail or Mobile No
                </label>
                <input
                  type="text"
                  value={Inputs.contact}
                  onChange={InputHandeler}
                  name="contact"
                  id="contact"
                  className="input_field"
                  required
                />
              </div>
            </div>

            <div
              className="form_step_btm"
              style={{ marginBottom: '5vh' }}
            >
              <div className="form_step_left">
                <label htmlFor="cnic_no" className="input_label">
                  Enter your Cnic No
                </label>
                <input
                  type="text"
                  value={Inputs.cnic_no}
                  onChange={InputHandeler}
                  name="cnic_no"
                  id="cnic_no"
                  className="input_field"
                  required
                />
              </div>
              <div className="form_step_right">
                <div className="Account_type">
                  <p className="gender" id="gender">
                    Select your gender:
                  </p>
                  <label
                    className={
                      Inputs.gender == 'male'
                        ? 'radio_selected'
                        : 'radio_label'
                    }
                  >
                    <input
                      className="radio_input"
                      type="radio"
                      checked={Inputs.gender == 'male'}
                      value="male"
                      onChange={InputHandeler}
                      name="gender"
                      required
                    />
                    Male
                  </label>

                  <label
                    className={
                      Inputs.gender == 'female'
                        ? 'radio_selected'
                        : 'radio_label'
                    }
                  >
                    <input
                      className="radio_input"
                      type="radio"
                      checked={Inputs.gender == 'female'}
                      value="female"
                      onChange={InputHandeler}
                      name="gender"
                      required
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div
              className="form_step_btm"
              style={{ marginTop: '-2vh', marginBottom: '3vh' }}
            >
              <div className="form_step_left">
                <label htmlFor="cityName" className="input_label">
                  Enter your City Name
                </label>
                <input
                  type="text"
                  id="cityName"
                  value={Inputs.city}
                  onChange={InputHandeler}
                  name="city"
                  className="input_field"
                  required
                />
              </div>
              <div className="form_step_right">
                <label htmlFor="country" className="input_label">
                  Enter Your Country Name
                </label>
                <input
                  type="text"
                  value={Inputs.country}
                  onChange={InputHandeler}
                  name="country"
                  id="country"
                  className="input_field"
                  required
                />
              </div>
            </div>

            <div
              className="errorContainer"
              style={{ marginBottom: '-2.1vh' }}
            >
              <span className="error2">{error}</span>
            </div>

            <div className="formBtns">
              <input
                type="button"
                value="Next"
                className="formBtn2"
                onClick={nextStep}
              />
            </div>
          </div>
        ) : (
          <div className="" onSubmit={SubmitProfile}>
            <div className="profile_title">
              <h2>{userProfile ? 'Edit' : 'Create'} Your Profile</h2>
              <p>Course Detail</p>
              <p>Step {step} of 2</p>
            </div>

            <div
              className="form_step_btm"
              style={{ marginTop: '1vh' }}
            >
              <div className="form_step_left">
                <label htmlFor="course_title" className="input_label">
                  Enter your Course Title
                </label>
                <input
                  type="text"
                  value={Inputs.course_title}
                  onChange={InputHandeler}
                  name="course_title"
                  className="input_field"
                  id="course_title"
                  required
                />
              </div>
              <div className="form_step_right">
                <label
                  htmlFor="course_language"
                  className="input_label"
                >
                  Enter your Course Language
                </label>
                <input
                  type="text"
                  value={Inputs.course_language}
                  onChange={InputHandeler}
                  name="course_language"
                  id="course_language"
                  className="input_field"
                  required
                />
              </div>
            </div>

            <div
              className="form_step_btm"
              style={{ marginTop: '6vh' }}
            >
              <div className="form_step_left">
                <label
                  htmlFor="courseDuration"
                  className="input_label"
                >
                  Enter your Course Duration
                </label>
                <input
                  type="text"
                  value={Inputs.courseDuration}
                  onChange={InputHandeler}
                  name="courseDuration"
                  id="courseDuration"
                  className="input_field"
                  required
                />
              </div>
              <div className="form_step_right">
                <label htmlFor="course_fee" className="input_label">
                  Enter your Course Fee
                </label>

                <input
                  type="number"
                  value={Inputs.course_fee}
                  onChange={InputHandeler}
                  name="course_fee"
                  id="course_fee"
                  className="input_field"
                  required
                />
              </div>
            </div>
            <div
              className="form_step_btm"
              style={{ marginTop: '6vh' }}
            >
              <div className="form_step_left">
                <label htmlFor="degreeName" className="input_label">
                  Enter your Degree Name
                </label>
                <input
                  type="text"
                  value={Inputs.degreeName}
                  onChange={InputHandeler}
                  name="degreeName"
                  id="degreeName"
                  className="input_field"
                  required
                />
              </div>
              <div className="form_step_right">
                <label
                  htmlFor="instituteName"
                  className="input_label"
                >
                  Enter your Institue Name
                </label>

                <input
                  type="text"
                  value={Inputs.instituteName}
                  onChange={InputHandeler}
                  name="instituteName"
                  id="instituteName"
                  className="input_field"
                  required
                />
              </div>
            </div>
            <div
              className="form_step_btm"
              style={{ marginTop: '6vh' }}
            >
              <div className="form_step_left">
                <label
                  htmlFor="degreeStartingDate"
                  className="input_label"
                >
                  Enter Degree Starting Date
                </label>
                <input
                  type="date"
                  value={Inputs.degreeStartingDate}
                  onChange={InputHandeler}
                  name="degreeStartingDate"
                  id="degreeStartingDate"
                  className="input_field"
                  required
                />
              </div>
              <div className="form_step_right">
                <label
                  htmlFor="degreeEndingDate"
                  className="input_label"
                >
                  Enter Degree Ending Date
                </label>

                <input
                  type="date"
                  value={Inputs.degreeEndingDate}
                  onChange={InputHandeler}
                  name="degreeEndingDate"
                  id="degreeEndingDate"
                  className="input_field"
                  required
                />
              </div>
            </div>
            <div
              className="form_step_btm"
              style={{ marginTop: '6vh' }}
            >
              <div className="form_step_left">
                <label htmlFor="experience" className="input_label">
                  Enter Your Experience
                </label>
                <input
                  type="text"
                  value={Inputs.experience}
                  onChange={InputHandeler}
                  name="experience"
                  id="experience"
                  className="input_field"
                  required
                />
              </div>
              <div className="form_step_right">
                <label for="sanadImage" className="input_label">
                  {Inputs.sanadImage || userProfile?.sanadImage ? (
                    <p>Sanad Image Selected</p>
                  ) : (
                    <p>Upload Sanad Image</p>
                  )}
                </label>
                <input
                  accept="image/*"
                  type="file"
                  name="sanadImage"
                  className="input_field"
                  onChange={InputHandeler}
                  id="sanadImage"
                  required
                />
              </div>
            </div>
            <div
              className="form_step_btm"
              style={{ marginTop: '6vh' }}
            >
              <div className="form_step_left">
                <label for="frontCnic" className="input_label">
                  {Inputs.frontCnic || userProfile?.frontCnic ? (
                    <p>Front Cnic Image Selected</p>
                  ) : (
                    <p>Upload Front Cnic Image</p>
                  )}
                </label>
                <input
                  accept="image/*"
                  type="file"
                  name="frontCnic"
                  className="input_field"
                  onChange={InputHandeler}
                  id="frontCnic"
                  required
                />
              </div>
              <div className="form_step_right">
                <label for="backCnic" className="input_label">
                  {Inputs.backCnic || userProfile?.backCnic ? (
                    <p>Back Cnic Image Selected</p>
                  ) : (
                    <p>Upload Back Cnic Image</p>
                  )}
                </label>
                <input
                  accept="image/*"
                  type="file"
                  name="backCnic"
                  className="input_field"
                  onChange={InputHandeler}
                  id="backCnic"
                  required
                />
              </div>
            </div>

            <div className="detailInput">
              <textarea
                type="text"
                value={Inputs.detail}
                onChange={InputHandeler}
                name="detail"
                id="detail"
                className="detailInput_field"
                placeholder="Say Something About Your Course, Qualification or anything else in Detail which you want to display on your Profile... "
                required
              />
            </div>

            <div
              className="errorContainer"
              style={{ marginTop: '4vh' }}
            >
              <span className="error2">{error2}</span>
            </div>

            <input
              type="button"
              onClick={SubmitProfile}
              value={
                userProfile ? 'Update Profile' : 'Submit Profile'
              }
              className="formBtn2"
              style={{ marginLeft: '29.5vw' }}
            />

            <div className="formBtns">
              <input
                type="submit"
                value="<<--Previous"
                className="previous"
                style={{
                  marginTop: '4vh',
                  fontSize: '20px',
                  padding: '10px 40px',
                  marginLeft: '-4%',
                }}
                onClick={() => setStep(1)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
