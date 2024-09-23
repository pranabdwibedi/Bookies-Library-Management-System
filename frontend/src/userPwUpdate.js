import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPwUpdate() {
    const [isValid, setIsValid] = useState(false)
    const [password,setPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [validateMessage, setValidateMessage] = useState('')
    const [updateMessage, setUpdateMessage] = useState('')
    const navigate = useNavigate();
    const verifyPassword = async(event) =>{
        event.preventDefault()
        const data = {
            userId : localStorage.getItem('userId'),
            password : password
        }
        try{
            await axios.post("http://localhost:8000/LMS/api/v1/users/login",data,

            ).then(response=>{
                setIsValid(true)
            }).catch(err=>{
                setValidateMessage("The password you entered is incorrect")
                setTimeout(()=>{
                    setValidateMessage('')
                },3000)
                setIsValid(false)
            })
        }catch(err){
            console.log(err)
        }
    }
    const updatePassword = async(event) =>{
        event.preventDefault()
        if(newPassword1 !== newPassword2){
            setUpdateMessage("The password didn't match")
            setTimeout(()=>{
                setUpdateMessage('')
            },3000)
            return;
        }
        const data = {
            userId : localStorage.getItem('userId'),
            password : password,
            newPassword : newPassword1
        }
        await axios.post('http://localhost:8000/LMS/api/v1/user/updatePW',data,{
            headers : {
                'x-access-token' : localStorage.getItem('token')
            }
        }).then(response=>{
            setUpdateMessage("Password updated successfully")
            localStorage.setItem('token','')
            navigate('/login')
        }).catch(err=>{
            setUpdateMessage(err.response.data.message)
            setTimeout(()=>{
                setUpdateMessage('')
            },3000)
        })
    }
  return (
    <div className="contentViewport d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column gap-3">
        <h1>
          <u>Password Update</u>
        </h1>
        <div className="d-flex flex-column updatePWForm">
        <form onSubmit={verifyPassword} className="d-flex flex-column align-items-center gap-2">
          <div class="mb-3">
            <label for="existingPassword" class="form-label">
              Enter your existing Password
            </label>
            <input
              type="password"
              class="form-control"
              id="existingPassword"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <span className="text-danger"><b>{validateMessage}</b></span>
          <button type="submit" className="btn btn-outline-primary">Authenticate</button>
        </form>
        <form onSubmit={updatePassword} className={`d-flex flex-column align-items-center gap-2 ${isValid?"":"visually-hidden"}`}>
          <div class="mb-3">
            <label for="newPassword" class="form-label">
              Enter your new Password
            </label>
            <input
              type="password"
              class="form-control"
              id="newPassword"
              value={newPassword1}
              onChange={(e)=>setNewPassword1(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="reenterNewPassword" class="form-label">
              Re-enter your new Password
            </label>
            <input
              type="password"
              class="form-control"
              id="reenterNewPassword"
              value={newPassword2}
              onChange={(e)=>{setNewPassword2(e.target.value)}}
            />
          </div>
          <span className="text-danger"><b>{updateMessage}</b></span>
          <button type="submit" className="btn btn-outline-primary">Authenticate</button>
        </form>
        </div>
      </div>
    </div>
  );
}
