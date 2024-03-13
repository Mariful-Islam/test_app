import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'

const SignUp = () => {

  const navigate = useNavigate()

  let [image, setImage] = useState("")
  console.log(image)


  let [errorMsg, setErrorMsg] = useState("")

  let onSignup = async(e) => {
    e.preventDefault()

    let formData = new FormData()
    formData.append("username", e.target.username.value)
    formData.append("password", e.target.password1.value)
    formData.append("phone_number", e.target.phone_number.value)
    formData.append("image", image)
    formData.append("division", e.target.division.value)

    if (e.target.password1.value===e.target.password2.value) {

      let url = 'http://127.0.0.1:8000/signup/'
      axios.post(url, formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(res=>{
        console.log(res.data)
      })
      .catch(err=> console.log(err))
      
      navigate('/login')

    }else{
        setErrorMsg("Password Not Matched")
    }
  }


  return (
    <div className='signup'>
        <h3 style={{textAlign:'center'}}>Sign Up</h3>
        
        <form method='POST' onSubmit={(e)=>onSignup(e)} encType='multipart/form-data'>
        <p style={{color:'orangered'}}>{errorMsg}</p>
          <input type='text' name='username' placeholder='Username' />
          <input type='text' name='phone_number' placeholder='Phone Number' />
          <input type='file' onChange={(e)=>setImage(e.target.files[0])}/>
          <label>Division</label>
          <select name='division'>
            <option>Barisal </option>
            <option>Chittagong</option>
            <option>Dhaka</option>
            <option>Khulna </option>
            <option>Mymensingh</option>
            <option>Rajshahi </option>
            <option>Rangpur </option>
            <option>Sylhet </option>
          </select>
          <input type='password' name='password1' placeholder='Password' />
          <input type='password' name='password2' placeholder='Confirm Password' />
      
          <input type='submit' value='Sign Up' /> 
          <br/><br/><br/>
          <Link to='/login/'>Login</Link>
        </form>
      </div>
  )
}

export default SignUp