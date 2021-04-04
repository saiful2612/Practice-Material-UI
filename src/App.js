import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';



firebase.initializeApp(firebaseConfig);

function App() {

  const [user, setUser]=useState({
    isSignedIn : false,
    name: '',
    Email: ''
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleClick = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res =>{
      const {displayName, email} =res.user;
      const signedInUser={
        isSignedIn : true,
        name: displayName,
        Email: email
      }
      setUser(signedInUser);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message)
    })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signOutUser= {
        isSignedIn: false,
        name: '',
        Email: ''
      }
      setUser(signOutUser)
    })
    .catch(err => {

    })

  }
  return (
    <div>
      <h2>This is pratice part</h2>
      <Button variant="contained" color="primary">
        Hello World
    </Button>

    {
      user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
      <button onClick={handleClick}>Sign In</button>
    }
    {
      user.isSignedIn && <p> Welcome, {user.name} </p>
    }
    </div>
  );
}

export default App;
