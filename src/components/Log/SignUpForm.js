import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import SignInForm from './SignInForm';

export default function SignUpForm() {

    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const terms = document.getElementById('terms');
        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const termsError = document.querySelector('.terms.error');



        if (!terms) {
            termsError.innerHTML = "Please validate the general conditions";
        } else if (!pseudo) {
            pseudoError.innerHTML = "this field must be completed";
        } else if (!email) {
            emailError.innerHTML = "this field must be completed";
        } else if (!password) {
            passwordError.innerHTML = "this field must be completed";
        } else if (!controlPassword) {
            passwordConfirmError.innerHTML = "this field must be completed";
        }

        if (password !== controlPassword) {
            passwordError.innerHTML = "These passwords does not correspond"
            passwordConfirmError.innerHTML = "These passwords does not correspond"
        }


        console.log('todo buen !');
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/register`,
            withCredentials: true,
            data: {
                pseudo,
                email,
                password,
            }
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log("Response data : ", response.data);

                    toast.success(response.data.message, { type: "warning", theme: "colored", autoClose: 5000 })
                    setFormSubmit(true)
                    // setTimeout(() => {
                    //     window.location.href = "/"
                    // }, 6000)


                }
            })
            .catch((err) => {
                console.log("🚀 ~ file: SignUpForm.js:67 ~ handleRegister ~ err:", err)
                console.log(err.response.data.errors.email);
                pseudoError.innerHTML = err.response.data.errors.pseudo;
                emailError.innerHTML = err.response.data.email;
                passwordError.innerHTML = err.response.data.password;
                toast.error(err.response.data.message, { type: "error", theme: "colored", autoClose: 5000 })

            })

    }

    return (
        <>
        {formSubmit ? (
            <>
            <SignInForm />
            <span></span>
            <h4 className="success">Enregistrement réussi, veuillez-vous connecter</h4>
            </>
        ) : (
            <form action="" onSubmit={handleRegister} id="sign-up-form">
                <label htmlFor='pseudo'>Pseudo</label>
                <br />
                <input
                    type="text"
                    name="pseudo"
                    id='pseudo'
                    onChange={(e) => setPseudo(e.target.value)}
                    value={pseudo}
                />
                <div className='pseudo error'></div>
                <br />
                <label htmlFor='email'>Email</label>
                <br />
                <input
                    type="text"
                    name="email"
                    id='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <div className='email error'></div>
                <br />
                <label htmlFor='password'>Mot de passe</label>
                <br />
                <input
                    type="password"
                    name="password"
                    id='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <div className='password error'></div>
                <br />
                <label htmlFor='password-conf'>Confirmer Mot de passe</label>
                <br />
                <input
                    type="password"
                    name="password"
                    id='password'
                    onChange={(e) => setControlPassword(e.target.value)}
                    value={controlPassword}
                />
                <div className='password-confirm error'></div>
                <br />

                <input type='checkbox' id="terms" />
                <label htmlFor='terms'>J'accepte les <a href='/' target='_blank' rel='noopener noreferrer'>conditions générales</a></label>
                <div className='terms error'></div>
                <br />
                <input type='submit' value="Valider inscription" />

            </form>

         )}
        </>
    )
}
