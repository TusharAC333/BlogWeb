import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username,setUsername]=useState('');
    const [redirect,setRedirect]=useState(false);
    const [password,setPassword]=useState('');

    async function register(ev){
        ev.preventDefault();

        const response=await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'}
        })
        if (response.status === 200) {
          alert("Registered successfully")
          setRedirect(true);
        } else {
          alert('registration failed');
        }
    }
    if(redirect){
      return <Navigate to={'/login'}/>
    }
  return (
    <div>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input type="text" placeholder='username' value={username} onChange={ev=> setUsername(ev.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={ev=> setPassword(ev.target.value)}/>
        {/* <input type="password" placeholder='password' /> */}
        <button>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
