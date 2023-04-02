import React, { useState, useContext, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import alertContext from '../Context/alert/alertContext';
// import authContext from '../Context/auth/authContext'
// import authState from '../Context/auth/authState';

const Login = () => {
  const context = useContext(alertContext)
  const {g, showAlert} = context
  // eslint-disable-next-line
  let navigate = useNavigate();
  useEffect(()=>{
    console.log(g)
  },[])
  // eslint-disable-next-line
  const [creds, setCreds] = useState({email:"", password:""})
  const host = `https://note-me-backend-gepece6jp-ali3905.vercel.app/`

  const handleLogin = async(email, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password: password})
    })
    const json = await response.json()
    localStorage.setItem("token", json.authtoken)
    showAlert("You have Succesfully Logged in", "success")
    navigate("/");
  }

  const loginUser = (e) => {
    e.preventDefault()
    console.log(creds);
    handleLogin(creds.email, creds.password)
  }
  const onChange = (e) => [
    setCreds({...creds, [e.target.name]: e.target.value})
  ]
  return (
    <div className='container my-4'>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={creds.email}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={creds.password}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
</form>
    </div>
  )
}

export default Login
