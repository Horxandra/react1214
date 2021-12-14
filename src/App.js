import axios, { Axios } from 'axios';
import './App.css';
import react from 'react';
import { useState } from 'react';



function App() {

  const getHello=async() => {
    const response=await axios.get("http://localhost:8000/api/hello")
    console.log(response)
  }

  const getSecret=async() => {
    const sessionId = sessionStorage.getItem("sessionId")
    console.log(sessionId)
    const response=await axios.get("http://localhost:8000/api/secret", {headers: {sessionId}})
    console.log(response)
  }

  const [userName,setUserName] = useState("")
  const [userNameLogin,setUserNameLogin] = useState("")

  const [password, setPassword] = useState("")
  const [passwordLogin, setPasswordLogin] = useState("")

  const register= async() => {
    try {
      const response = await axios.post("http://localhost:8000/api/signup", {username:userName, password:password})
      alert("ok")
    } catch (error) {
      alert("ilyen már van")
    }
  }

  const login= async() => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {username:userNameLogin, password:passwordLogin})
      sessionStorage.setItem("sessionId", response.data.sessionId)
      alert("bent vagy")
      instance.defaults.headers.common['Authorization']
      // console.log(response)
    } catch (error) {
      alert("rossz a felhasználó/jelszó")
    }
  }

  return (
    <div className="App">
      
      <button onClick={getHello}>GetHello!</button>
      <button onClick={getSecret}>GetSecret!</button>
      
      <div id="signup">
        <input placeholder="username" value={userName} onChange={(event) => {setUserName(event.target.value)}} />
        <input placeholder="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />
        <button onClick={register}>Register</button>
      </div>

      <div id="login">
        <input placeholder="username" value={userNameLogin} onChange={(event) => {setUserNameLogin(event.target.value)}} />
        <input placeholder="password" value={passwordLogin} onChange={(event) => {setPasswordLogin(event.target.value)}} />
        <button onClick={login}>Login</button>  
      </div>
    </div>
  );
}

export default App;
