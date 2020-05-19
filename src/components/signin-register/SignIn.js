import React from "react";
import firebase from "firebase/app";
import { isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';

function Signin(props){

  const auth = firebase.auth();

  const {onCLickGoogleSignin, thisUserName, thisUserEmail} = props;
  
  const formStyle = {
    width: "200px",
  };
  const googleStyle={
    marginTop: '20px'
  }

  function doSignIn(event){
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      console.log("Successfully signed in!");
    }).catch((error) => {
      console.log(error.message);
    });
  }

  if ((isLoaded(auth)) && (auth.currentUser == null)) {
    return (
      <React.Fragment>
        <h1>Sign In</h1>
        <form onSubmit={doSignIn}>
          <div className="form-group">
            <input
              style={formStyle}
              className="form-control"
              type='text'
              name='email'
              placeholder='email'
              required 
            />
          </div>
          <div className="form-group">
            <input
              style={formStyle}
              className="form-control"
              type='password'
              name='password'
              placeholder='password'
              required 
            />
          </div>
          <button className="btn btn-info" type='submit'>Sign in</button>
        </form>
        <div style={googleStyle} onClick = {() => onCLickGoogleSignin()}id="my-signin2"></div>
        <button style={googleStyle} onClick = {() => onCLickGoogleSignin()}>Sign in with Google</button>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <h3>My cabinet:</h3>
        <p>Name: {thisUserName}</p>
        <p>E-mail: {thisUserEmail}</p>
        <h5>Your card:</h5>
      </React.Fragment>
    )
  }
}

Signin.propTypes = {
  onCLickGoogleSignin: PropTypes.func,
  thisUserEmail: PropTypes.string,
  thisUserName: PropTypes.string
}


export default Signin;