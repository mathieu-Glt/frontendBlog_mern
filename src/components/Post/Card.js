import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import FollowHandler from '../Profil/FollowHandler';
import ReactPlayer from 'react-player/youtube';
import LikeButton from './LikeButton';
import { getPosts, updatePost } from '../../actions/post/post.actions';
import DeleteCard from './DeleteCard';
import CardComment from './CardComment';


export default function Card({ post }) {
console.log("🚀 ~ file: Card.js:13 ~ Card ~ posts:", post)
const userData = useSelector((state) => state.user)
console.log("🚀 ~ file: Card.js:15 ~ Card ~ userData:", userData)
const usersData = useSelector((state) => state.users)
const [isLoading, setIsLoading] = useState(true)
const [isUpdated, setIsUpdated] = useState(false)
const [textUpdate, setTextUpdate] = useState(null)
const [showComments, setShowComments] = useState(false)
const dispatch = useDispatch()


console.log("🚀 ~ file: Card.js:120 ~ Card ~ userData:", userData[0])

const updateItem =  () => {
    if(textUpdate) {
         dispatch(updatePost(post._id, textUpdate))
    }
    setIsUpdated(false)
}

useEffect(() => {
        !isEmpty(usersData) && setIsLoading(false)
}, [usersData])


  return (
    <div>
        <li className='card-container'>
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <>
                <div className='card-left'>
                    <img src={
                        !isEmpty(usersData) &&
                            usersData
                                .map((user) => {
                                    console.log('User:', user)
                                   if(user._id === post.posterId) return './uploads/profil/' + user.picture;
                            })
                            .join('')
                    }
                    alt='poster-pic'
                    />
                </div>
                <div className='card-right'>
                    <div className='card-header'>
                        <div className='pseudo'>
                            <h3>
                            {!isEmpty(usersData[0]) &&
                            usersData
                                .map((user) => {
                                   if(user._id === post.posterId) return user.pseudo;
                            })
                            }
                            </h3>
                            {post.posterId !== userData.id && <FollowHandler idToFollow={post.posterId} type={"card"}/>}
                        </div>
                        <span>{dateParser(post.createdAt)}</span>
                    </div>
                    {isUpdated === false && <p>{post.message}</p>}
                    {isUpdated && (
                        <div className='update-post'>
                            <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)}/>
                            <div className='button-container'>
                                <button className='btn' onClick={updateItem}>Valider modification</button>
                            </div>
                        </div>
                    )}
                    {post.picture && <img src={'./uploads/posts/' + post.picture} alt="card-pic" className='card-pic' height="500px" />}
                    {post.video && (
                        <ReactPlayer url={post.video}/>
                    )}
                    {userData.id === post.posterId && (
                        <div className='button-container'>
                            <div onClick={() => setIsUpdated(!isUpdated)}>
                                <img src='./img/icons/edit.svg' alt="edit"  />                         
                            </div>
                            <DeleteCard post={post}/>
                        </div>
                    )}
                    <div className='card-footer'>
                        <div className='comment-icon'>
                            <img onClick={() => setShowComments(!showComments)} src='./img/icons/message1.svg' alt='comment' />
                            <span>{post.comments.lenght}</span>
                        </div>
                        <LikeButton post={post} />
                        <img src='./img/icons/share.svg' alt='share' />
                    </div>
                    {showComments && <CardComment post={post} />}
                </div>
                </>
            )}
        </li>
    </div>
  )
}
