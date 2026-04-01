import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, timestampParser } from '../Utils'
import { NavLink } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube';
import { addPost, getPosts } from '../../actions/post/post.actions';
import { middlewareError } from '../../middleware/errors.midddleware';

export default function NewPostForm() {

    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [picture, setPicture] = useState(null)
    const [video, setVideo] = useState('')
    const [file, setFile] = useState()
    const [error, setError] = useState({})
    console.log("🚀 ~ file: NewPostForm.js:17 ~ error:", error)
    const userData = useSelector((state) => state.user)
    console.log("🚀 ~ file: NewPostForm.js:19 ~ NewPostForm ~ userData:", userData)
    const posts = useSelector((state) => state.posts);
    console.log("🚀 ~ file: NewPostForm.js:17 ~ NewPostForm ~ posts:", posts)
    console.log("🚀 ~ file: NewPostForm.js:13 ~ NewPostForm ~ userData:", userData)
    const errors = useSelector((state) => state.error.postError)
    console.log("🚀 ~ file: NewPostForm.js:20 ~ NewPostForm ~ errors:", errors)
    const dispatch = useDispatch()
    console.log("🚀 ~ file: NewPostForm.js:15 ~ NewPostForm ~ file:", file)


    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false)
        handleVideo();
    }, [userData, message, video])

    // const handleVideo = () => {
    //     let findLink = message.split(" ");
    //     console.log(findLink);
    //     for (let i = 0; i < findLink.length; i++) {
    //         if (findLink[i].includes("https://www.yout") || findLink[i].includes("https://yout")) {
    //             let embed = findLink[i].replace('watch?v=', "embed/");
    //             setVideo(embed.split('&')[0]);
    //             findLink.splice(i, 1)
    //             setMessage(findLink.join(" "))
    //         }

    //     }
    // }

    // const handlePost = (e) => {
    //     e.preventDefault()
    //     if (message || picture || video) {
    //         const data = new FormData();
    //         data.append('posterId', userData.id);
    //         data.append('message', message);
    //         if (file) data.append("file", file);
    //         data.append('video', video);
    //         console.log("🚀 ~ file: NewPostForm.js:45 ~ handlePost ~ data:", data)

    //         dispatch(addPost(data))
    //         // .then(() => dispatch(getPosts()))
    //         // .then(() => cancelPost())


    //     } else {
    //         alert("Veuillez entrer un message")
    //     }

    // };

    const handlePost = (e) => {
        e.preventDefault()
        if (file) {
            const verifyErrorForm = middlewareError(file)
            console.log("🚀 ~ file: NewPostForm.js:70 ~ handlePost ~ verifyErrorForm:", verifyErrorForm)
            setError(verifyErrorForm)
            console.log("🚀 ~ file: NewPostForm.js:1745 ~ error:", error)

            if(error) {
                alert("Veuillez vérifier le fichier que vous envoyez")

            } else {
                if (message || picture || video) {
                    console.log('la suite ');
                    const data = new FormData();
                    data.append('posterId', userData.id);
                    data.append('message', message);
                    if (file) data.append("file", file);
                    data.append('video', video);

                    dispatch(addPost(data));
                    //   setTimeout(() => {

                        //   dispatch(getPosts());
                    //   }, 10000)
                    cancelPost();
                }

            }

        }


    }



const handlePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
    setVideo('')
}


const cancelPost = () => {
    setMessage("")
    setPicture("")
    setVideo('')
    setFile("")
}

const handleVideo = useCallback(() => {
    let findLink = message.split(" ");
    for (let i = 0; i < findLink.length; i++) {
        if (
            findLink[i].includes("https://www.yout") ||
            findLink[i].includes("https://yout")
        ) {
            let embed = findLink[i].replace("watch?v=", "embed/");
            setVideo(embed.split("&")[0]);
            findLink.splice(i, 1);
            setMessage(findLink.join(" "));
            setPicture('');
        }
    }
}, [message]);

useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
    handleVideo();
}, [message, video, userData, handleVideo]);


return (
    <div className='post-container'>
        {isLoading ? (
            <p className='fas fa-spinner'>Loading...</p>
        ) : (
            <>
                <div className='data'>
                    <p><span>{userData.following ? userData.following.length : 0} </span>Abonement{userData.following && userData.following.length > 1 ? "s" : null}</p>
                    <p><span>{userData.followers ? userData.followers.length : 0} </span>Abonement{userData.followers && userData.followers.length > 1 ? "s" : null}</p>
                </div>
                <NavLink to="/profil">
                    <div className='user-info'>
                        <img src={"./uploads/profil/" + userData.picture} alt='user-img' />
                    </div>
                </NavLink>
                <form action="" onSubmit={handlePost} className='post-form'>
                    <textarea name='message' id='message' placeholder='Quoi de neuf ?' onChange={(e) => setMessage(e.target.value)} value={message} />
                    {message || picture || video.length > 20 ? (
                        <li className='card-contaier'>
                            <div className='card-left'>
                                <img style={{ marginTop: "50px", borderRadius: "10px" }} src={"./uploads/profil/" + userData.picture} alt='user-pic' height="200px" width="150px" />
                            </div>
                            <div className='card-right'>
                                <div className='cad-header'>
                                    <div className='pseudo'>
                                        <h3>{userData.pseudo}</h3>
                                    </div>
                                    <span>{timestampParser(Date.now())}</span>
                                </div>
                                <div className='content'>
                                    <p>{message}</p>
                                    <img src={picture} alt='' />
                                    {video && (
                                        <ReactPlayer url={video} />
                                    )}
                                </div>
                            </div>
                        </li>
                    ) : null}

                    <div className='footer-form'>
                        <div className='icon'>
                            {isEmpty(video) && (
                                <>
                                    <img src='./img/icons/picture.svg' alt='img' />
                                    <input type='file' id='file-upload' name='file' accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture(e)} />
                                </>
                            )}
                            {video && (
                                <button onClick={() => setVideo("")}>Supprimer video</button>
                            )}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", flexDirection: "column", width: "80%", marginRight: "300px" }}>
                                <div style={{ display: "block", width: "100%" }}>{!isEmpty(error.format) && <p>{error.format}</p>}</div>
                                <div style={{ display: "block", width: "100%" }}>{!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}</div>

                            </div>
                            <div style={{ justifyContent: "center" }} className='btn-send'>
                                {message || picture || video.length > 20 ? (
                                    <button className='cancel' onClick={cancelPost}>Annuler message</button>
                                ) : null}
                                <input type='submit' value="Envoyer" />
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )}
    </div>
)
}

