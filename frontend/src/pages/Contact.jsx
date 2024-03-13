import axios from "axios";
import React, { useEffect, useState } from "react";
import saad from '../assets/saad.jpg'
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Contact = () => {

    let navigate = useNavigate()

    let [image, setImage] = useState("")

    let [page, setPage] = useState(1)

    let pageChange = (value, event) => {
        setPage(event)
    }



    
    let [contacts, setContacts] = useState([])
    let [count, setCount] = useState(0)

    let getContacts = () => {
        let url = `/contacts/?page=${page}`
        axios.get(url)
        .then(response=>{
            setContacts(response.data.results) ;
            setCount(response.data.count);
    })
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        getContacts()
    }, [page])
 
    
    let handleCreateContact = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("author", localStorage.getItem('username'))
        formData.append("username", e.target.username.value)
        formData.append("phone_number", e.target.phone_number.value)
        formData.append("image", image)
        formData.append("division", e.target.division.value)

        let url = '/create_contact/'

        axios.post(url, formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=> console.log(err))
        getContacts()
    }

    let [res, setRes] = useState('')

    let deleteHandle = (id) => {
        // let response = await fetch(`https://saaddev.pythonanywhere.com/blog/post_delete/${post.id}/`, {
        //     method: "DELETE",
        //     headers:{
        //         "Content-Type": "application/json"
        //     }
        // })
        // let data = await response.json()
        // setPostRes(data)
        // getPosts()
        axios.delete(`/up_dlt_contact/${id}/`, {
            headers:{
                "content-type": "multipart/form-data"
            }
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
        getContacts()
    }

    let updateContact = (id) => {
        navigate(`/update/${id}/`)
       
    }

    let add = () => {
        let contactForm = document.querySelector('.contact_form')
        contactForm.classList.toggle('active')
    }


    return (
        <div className="contact">
            <div>
                <svg onClick={add} fill="#000000" id="Capa_1" width="30px" height="30px" viewBox="0 0 45.402 45.402" >
                    <g>
                        <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
                    </g>
                </svg>
            </div>
            <div className="contact_form">

                <form method="POST" onSubmit={(e)=>handleCreateContact(e)} encType='multipart/form-data'>
                    <input type='text' name='username' placeholder='Name'/>
                    <input type='text' name='phone_number' placeholder='Phone Number'/>
                    <input type='file' onChange={(e)=>setImage(e.target.files[0])}/>
                    <input type='text' name='division' placeholder='Division'/>
                    <input type='submit' value='Create'/>
                </form>
            </div>
            <h2>Contact</h2>
            
            <div>

                <table>
                
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Division</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                {contacts.map((contact)=>
                    <tr>
                        <td>
                            <img style={{height:35, width:35, objectFit:"cover", borderRadius:"50%"}} 
                                src={contact.image} alt=""/>
                        </td>
                        <td>{contact.username}</td>
                        <td>{contact.phone_number}</td>
                        <td>{contact.division}</td>
                        <td><Link to={`/profile/${contact.author}`}>{contact.author}</Link></td>
                        <td style={{display:"flex", gap:10}}>

                            <svg onClick={()=>updateContact(contact.id)} viewBox="0 0 512 512" height='20px' width='20px'>
                                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
                            </svg> 

                            <svg onClick={()=>deleteHandle(contact.id)} class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 7l16 0"/>
                                <path d="M10 11l0 6"/>
                                <path d="M14 11l0 6"/>
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
                            </svg>
                        </td>
                    </tr> 
                    
)}
                </table>
            </div>

            <div className="pagination">
                <Stack spacing={2}>

                    <Pagination count={Math.ceil(count/5)} shape="rounded" page={page} onChange={pageChange}/>
                </Stack>
            </div>
            
        </div>
    )
}

export default Contact