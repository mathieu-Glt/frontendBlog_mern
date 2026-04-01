import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';



export default function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
 
        if(!email || !password) {
            emailError.innerHTML = "this field must be completed";
            passwordError.innerHTML = "this field must be completed";

        } else {
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/login`,
                withCredentials: true,
                data: {
                    email,
                    password
                }
            })
                .then((response) => {
                        
                    if(response.status === 200) {
                        console.log("Response data : ", response.data);
                        // toast.success(`You're well connected ${response.user.pseudo}`, { type: "info", theme: "colored", autoClose: 5000})
                        toast.success(response.data.message, { type: "info", theme: "colored", autoClose: 5000})
    
                        setTimeout(() => {
                            window.location.href = "/"
                        }, 6000)
    
                    } 
                })
                .catch((err) => {
                    console.log("🚀 ~ file: SignInForm.js:44 ~ handleLogin ~ err:", err)
                    console.log(err.response.data.errors.email);
                    emailError.innerHTML = err.response.data.errors.email;
                    passwordError.innerHTML = err.response.data.errors.password;
                    toast.error(err.response.data.message, { type: "error", theme: "colored", autoClose: 5000})
    
    
                })
    
        }


    }


  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
        <label htmlFor='email'>Email</label>
            <br/>
        <input 
            type="text" 
            name="email" 
            id='email' 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
        /> 
        <div className='email error'></div>       
        <br/>
        <label htmlFor='password'>Mot de passe</label>
        <br/>
        <input 
            type="password" 
            name="password" 
            id='password' 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
        />
        <div className='password error'></div>       
        <br/>

        <input type='submit' value="Se connecter" />

    </form>
  )
}
