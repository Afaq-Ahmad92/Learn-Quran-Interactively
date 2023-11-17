import React, { useEffect, useState } from 'react';
import { ContextProvider } from '../Global/Context';
import '../Styling_Sheets/Authorization.css';
import { useParams } from 'react-router-dom';
import logo2 from '../assets/image/logo2.jpg';
import TextField from '@mui/material/TextField';

const Authorization = () => {
  const {
    Register,
    UserLogin,
    user,
    EmailVerified,
    AccountRegisterClick,
  } = React.useContext(ContextProvider);
  let { AuthorizationPage } = useParams();
  const [State, setState] = useState({
    Login: AuthorizationPage == 'login' ? true : false,
    Register: AuthorizationPage == 'signup' ? true : false,
  });
  const [error, setError] = useState('');
  const [checkAccount, setcheckAccount] = useState(false);
  let { AccountType } = useParams();
  const [Inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  console.log(Inputs);
  console.log(AccountType);

  useEffect(() => {
    setcheckAccount(true);
  }, [user]);
  const InputHandeler = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...Inputs,
      [name]: value,
    });
  };

  const FormTrigger = () => {
    setState({
      ...State,
      Register: !State.Register,
      Login: !State.Login,
    });
  };

  function formValidation() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (Inputs.confirm_password !== Inputs.password) {
      setError('Your Password doest Not match');
      return false;
    } else if (Inputs.password.length < 6) {
      setError('Kindly enter password of atleast 6 digits');
      return false;
    } else if (!Inputs.email.match(mailformat)) {
      setError('You have entered an invalid email address!');
      return false;
    }

    return true;
  }

  const RegisterUser = (event) => {
    event.preventDefault();
    if (formValidation() == true) {
      setError('');
      Register(Inputs, AccountType);
      setInputs({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
      });
    }
  };

  const LoginUser = (event) => {
    event.preventDefault();
    UserLogin(Inputs);
  };

  return (
    <div>
      <div className="form">
        {State.Register ? (
          <form
            className="form_container register_form"
            onSubmit={RegisterUser}
          >
            <img className="form_img_2" src={logo2} alt="logo" />
            <h1 style={{ marginBottom: '2%', marginTop: '0.3%' }}>
              {' '}
              Welcome to {AccountType} Sign Up
            </h1>

            <TextField
              id="outlined-basic"
              label="Enter Your Name"
              value={Inputs.name}
              onChange={InputHandeler}
              name="name"
              required
              className="form_input_register"
              color="success"
            />
            <TextField
              id="outlined-basic"
              label="Enter Your Email"
              type="email"
              value={Inputs.email}
              onChange={InputHandeler}
              name="email"
              required
              className="form_input_register"
              color="success"
            />
            <TextField
              id="outlined-basic"
              label="Enter Your Password"
              variant="outlined"
              type="password"
              value={Inputs.password}
              onChange={InputHandeler}
              name="password"
              required
              className="form_input_register"
              color="success"
            />
            <TextField
              id="outlined-basic"
              label="Confirm your password"
              variant="outlined"
              type="password"
              value={Inputs.confirm_password}
              onChange={InputHandeler}
              name="confirm_password"
              required
              className="form_input_register"
              color="success"
            />
            <span className="error">{error}</span>
            <input
              type="submit"
              value="Register"
              className="form_btn"
              onClick={RegisterUser}
            />
            <span>Already have Account ?</span>
            <input
              type="button"
              value="Log In"
              className="form_btn second_btn"
              onClick={FormTrigger}
            />
          </form>
        ) : (
          <form
            className="form_container login_form"
            onSubmit={LoginUser}
          >
            <img className="form_img" src={logo2} alt="logo" />
            <h1 style={{ marginBottom: '-5%', marginTop: '1.5%' }}>
              Welcome to {AccountType} Log In
            </h1>
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Enter Your Email"
              type="email"
              value={Inputs.email}
              onChange={InputHandeler}
              className="form_input"
              name="email"
              color="success"
            />
            <TextField
              id="outlined-basic"
              label="Enter Your Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              value={Inputs.password}
              onChange={InputHandeler}
              color="success"
              name="password"
              className="form_input"
            />
            {State.Login ? (
              <span className="error">{error}</span>
            ) : (
              <br />
            )}
            <input
              type="submit"
              value="Log In"
              className="form_btn"
              onClick={LoginUser}
            />
            <span>Don't have Account ?</span>
            <input
              type="button"
              value="Create Account"
              className="form_btn second_btn"
              onClick={FormTrigger}
            />
          </form>
        )}
      </div>

      {EmailVerified
        ? checkAccount &&
          user && (
            <div className="btmDIv">
              <a href="/" className="homebtn">
                Go to Home
              </a>
              <p className="btm_title">You are Logged In</p>
            </div>
          )
        : AccountRegisterClick && (
            <div className="verify_email">
              <p>
                You are not verify your Email Address.Visit Your Gmail
                Account to Verify Address
              </p>
              <p className="p2">
                If You have Verify Your Email Address
              </p>
              <a href="/Authorization/teacher">Click Here</a>
            </div>
          )}
    </div>
  );
};

export default Authorization;
