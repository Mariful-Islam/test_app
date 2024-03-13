import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {

  let navigate = useNavigate()

  let [errorMsg, setErrorMsg] = useState("")

  let onLogin = async(e) => {
    e.preventDefault()
    let response = await fetch('http://127.0.0.1:8000/dj-rest-auth/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"username": e.target.username.value,
                          "password": e.target.password.value})
    })
    let data = await response.json()
    if (data==="Invalid Credintial"){
      setErrorMsg(data)
    }else{
      localStorage.setItem('username', e.target.username.value)
      localStorage.setItem('token', data['access'])
      setErrorMsg(data['access'])
      navigate('/')
    } 
  }

  return (
    <div className='wrapper height_wrapper'>
      <h3 style={{textAlign:'center'}}>Login</h3>
      <form method='POST' onSubmit={(e)=>onLogin(e)}>
        <p className='tsc' style={{color:'orangered'}}>{errorMsg}</p>
        <input type='text' name='username' placeholder='Username' />
        <input type='text' name='password' placeholder='Password' />
        <input type='submit' value='Login' /> <br/><br/><br/>
        <Link style={{textAlign:'center'}} to='/signup/'>SignUp</Link>
      </form>
    </div>
  )
}

export default Login