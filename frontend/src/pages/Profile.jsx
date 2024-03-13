import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import saad from '../assets/saad.jpg'

 
 const Profile = () => {
    let {username} = useParams()

    let [user, setUser] = useState("")
    
    useEffect(()=>{
        getUser()
    }, [])

    let getUser = async() => {
        let response = await fetch(`http://127.0.0.1:8000/get_user/${username}`)
        let data = await response.json()
        setUser(data)
        console.log(data)
    }


   return (
      <div className='profile'>
          <div className='profile_image'>
            <img src={saad} alt=''/>
          </div>

          <div className='profile_details'>
            <h2 style={{textAlign:'center'}}>{user.username}</h2>
            <p><strong>Phone Number:</strong> {user.phone_number}</p>
            <p><strong>Division:</strong> {user.division}</p>
          </div>
      </div>
   )
 }
 
 export default Profile