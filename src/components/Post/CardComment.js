import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, timestampParser } from '../Utils'
import FollowHandler from '../Profil/FollowHandler'
import { StepContext } from '@mui/material'
import { addComment, getPosts } from '../../actions/post/post.actions'
import EditDeleteComment from './EditDeleteComment'

export default function CardComment({ post }) {

    const userData = useSelector((state) => state.user)
    console.log("🚀 ~ file: CardComment.js:10 ~ CardComment ~ userData:", userData)
    const usersData = useSelector((state) => state.users)
    const [text, setText] = useState("");
    console.log("🚀 ~ file: CardComment.js:14 ~ CardComment ~ text:", text)
    const dispatch = useDispatch()


    const handleComment = (e) => {
        console.log('comment !');
        e.preventDefault()

        if(text) {
            dispatch(addComment(post._id, userData.id, text, userData.pseudo))
                .then(() => dispatch(getPosts()))
                .then(() => setText(""))
        }
    }

    return (
        <div className='comments-container'>
            {post.comments.map((comment) => {
                return (
                    <div className={comment.commenterId === userData._id ? 'comment-container client' : 'comment-container'} key={comment._id}>
                        <div className='left-part'>
                            <img src={
                                !isEmpty(usersData[0]) &&
                                usersData
                                    .map((user) => {
                                        if (user._id === comment.commenterId) return './uploads/profil/' + user.picture;
                                        else return null
                                    })
                                    .join('')
                            }
                                alt='commenter-pic' />
                        </div>
                        <div className='right-part'>
                            <div className='comment-header'>
                                <div className='pseudo'>
                                    <h3>{comment.commenterPseudo}</h3>
                                    {comment.commenterId !== userData._id && <FollowHandler idToFollow={comment.commenterId} type={'card'} />}
                                </div>
                                <span>{timestampParser(comment.timestamp)}</span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post._id} />
                        </div>
                    </div>
                )
            })}
            {userData.id && (
                <form action="" onSubmit={handleComment} className="comment-form" >
                    <input type='text' name='text' onChange={(e) => setText(e.target.value)} value={text} placeholder='Laisser un commentaire' />
                    <br />
                    <input type='submit' value="Envoyer" />
                </form>
            )}

        </div>
    )
}
