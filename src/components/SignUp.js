import React, { useState } from 'react'
// import authContext from '../Context/auth/authContext'
import {useNavigate} from 'react-router-dom';

const SignUp = () => {

  // const context = useContext(authContext)
  // const {} = context
  // eslint-disable-next-line
  let navigate = useNavigate();
  // eslint-disable-next-line
  const [creds, setCreds] = useState({name:"", email:"", password:""})
  const host = `https://note-me-backend-gepece6jp-ali3905.vercel.app/`

  const handleSignup = async(name, email, password) => {
    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: name, email: email, password: password})
    })
    const json = await response.json()
    navigate("/");
    console.log(json);
  }
  const signup = (e) => {
    e.preventDefault()
    console.log(creds);
    handleSignup(creds.name, creds.email, creds.password)
  }
  const onChange = (e) => [
    setCreds({...creds, [e.target.name]: e.target.value})
  ]
  return (
    <div className='container my-4'>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="email" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} value={creds.name}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={creds.email}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={creds.password}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={signup} disabled = {creds.name.length<3 || creds.password.length<5} >SignUp</button>
</form>
    </div>
  )
}

export default SignUp
