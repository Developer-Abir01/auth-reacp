import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import firebaseConfig from './fierbase.config';
import { useState } from 'react';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
}

function App() {

  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();
  
  const [user, setUser] = useState({})


  const handleGoogleSingIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user)

        // ...
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage ,errorCode , email , credential)
      });
  }




  const handleFbSingIn = () => {

    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        setUser(user)
       
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorMessage ,errorCode , email , credential)

        // ...
      });


  }

  const handleGhSingIn = () => {
    firebase
      .auth()
      .signInWithPopup(ghProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user)
        
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage ,errorCode , email , credential)
      });
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSingIn}>  Sing In use in Google</button>
      <br />
      <br />
      <br />
      <button onClick={handleFbSingIn}>Facebook Sing in</button>
      <br />
      <br /><br />
      <br />
      <button onClick={handleGhSingIn}>GitHab Sing in</button>

      <p>User Name: {user.displayName}</p>
      <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
