import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER } from '../../actions/user/actions-type';
import { uploadPicture } from '../../actions/user/user.actions';

export default function UploadImg() {

    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user)
    console.log("🚀 ~ file: UploadImg.js:9 ~ UploadImg ~ userData:", userData)

    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", userData.pseudo)
        data.append("userId", userData.id)
        data.append("file", file)

        dispatch(uploadPicture(data, userData.id))

    };


    return (
        <div>
            <form action='' onSubmit={handlePicture} className="upload-pic">
                <label htmlFor='file'>Changer d'image</label>
                <br/><br/>
                <input type='file' id='file' name='file'  accept='.jpg, .jpeg, .png' onChange={(e) => setFile(e.target.files[0])} />
                <br/>
                <input type='submit' value="Envoyer" />
            </form>
        </div>
    )
}
