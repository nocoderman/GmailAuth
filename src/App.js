import './App.css';
import {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode"

function App() {

  const [user, setUser] = useState({});

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInButton").hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInButton").hidden = false;
  }

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id: "353394535321-h8j78a7p5cvndiu5a0mlutrle1sq3eks.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInButton"),
      { theme: "outline", size: "large", logo_alignment: "left", type: "icon"}
    );
  }, []);

  return (
      <div className="App">
        <div id="signInButton"></div>
        {
          Object.keys(user).length !== 0 && <button onClick= {(e) => handleSignOut(e)}>Sign Out</button>
        }
      
        { user && 
          <div className="output">
            <img src={user.picture}></img>
            <h3 id="header3">Welcome {user.name}</h3>
          </div>
        }
      </div>
  );
}

export default App;
