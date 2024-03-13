import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Await, useNavigate, useParams } from 'react-router-dom'

const Update = () => {

    let {id} = useParams()

    let navigate = useNavigate()

    // let [contact, setContact] = useState({
    //     "author": "",
    //     "username": "",
    //     "phone_number": "",
    //     "image": "",
    //     "division": ""
    // })

    // let [contact, setContact] = useState("")
    let [image, setImage] = useState("")

    let [author, setAuthor] = useState("")
    let [username, setUsername] = useState("")
    let [phoneNumber, setPhoneNumber] = useState("")
    let [newImage, setNewImage] = useState("")
    let [division, setDivision] = useState("")

    console.log('image', image, 'newImage', newImage)


    let getContact = async () => {
        // axios.get(`/up_dlt_contact/${id}/`)
        // .then((res)=> (
        //     // setAuthor(res.data.author) && 
        //     // setUsername(res.data.username) &&
        //     // setPhoneNumber(res.data.phone_number) &&
        //     // setImage(res.data.image) &&
        //     // setDivision(res.data.division) 
        //     setContact(res.data)
        // ))
        // .catch(err=>console.log(err))
        let res = await fetch(`http://127.0.0.1:8000/up_dlt_contact/${id}/`)
        let data = await res.json()
        setAuthor(data.author)
        setUsername(data.username)
        setPhoneNumber(data.phone_number)
        setImage(data.image)
        setDivision(data.division) 
    }

    useEffect(()=>{
        getContact()
    }, [])


    let handleUpdateContact = (e) => {
        let formData = new FormData()
        // formData.append("id", id)
        formData.append("author", author)
        formData.append("username", username)
        formData.append("phone_number", phoneNumber)

        if (newImage) {
            formData.append("image", newImage)
            formData.append("division", division)
        }else{
            formData.append("image", image)
            formData.append("division", division)
        }
        // formData.append("image", image)
        

        axios.put(`http://127.0.0.1:8000/up_dlt_contact/${id}/`, formData, {
            headers:{
                "content-type": "multipart/form-data"
            }
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
        navigate('/')
    }

    let imageChangeHandler = (e) => {
        setNewImage(e.target.files[0])
        setImage(e.target.files[0])
    }


  return (
    <div className='contact_update'>
        <h2> Edit {username}</h2>
        <form method="PUT" action='/' onSubmit={(e)=>handleUpdateContact(e)} encType='multipart/form-data'>
                <input type='text' name='username' placeholder='Name' 
                value={username} 
                onChange={e=>setUsername(e.target.value)} 
                />

                <input type='text'  name='phone_number' placeholder='Phone Number' 
                value={phoneNumber} 
                onChange={e=>setPhoneNumber(e.target.value)}
                />

                {
                    newImage ? 
                        <img src={URL.createObjectURL(newImage)} alt=''/> :
                        <img src={image} alt=''/> 
                }

                <input type='file' defaultValue={image} onChange={(e)=> imageChangeHandler(e)}/>

                <input type='text' name='division' placeholder='Division'
                value={division} 
                onChange={e=>setDivision(e.target.value)}
                />
                <input type='submit' value='Update'/>
        </form>
    </div>
  )
}

export default Update