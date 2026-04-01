import React, { useContext } from 'react'
import Log from '../components/Log'
import { UidContext } from '../components/AppContext'
import UpdateProfil from '../components/Profil/UpdateProfil'


export default function Profil() {
    const uid = useContext(UidContext)
    console.log("🚀 ~ file: Profil.js:8 ~ Profil ~ uid:", uid)

    return (
        <div className='profil-page'>
            {uid ? (
                // <h1>UPDATE PAGE</h1>
                <UpdateProfil/>
            ) : (
                <>
                    <div className='log-container'>
                        <Log signin={false} signup={true} />
                    </div>
                    <div className='img-container'>
                        <img src='./img/log.svg' alt='logo' />
                    </div>
                </>
            )}
        </div>
    )
}
