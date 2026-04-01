import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/post/post.actions'

export default function DeleteCard({ post }) {
// console.log("🚀 ~ file: DeleteCard.js:6 ~ DeleteCard ~ postId:", post)

    const dispatch = useDispatch()

    const deleteQuote = () => {
        dispatch(deletePost(post._id))
    }

  return (
    <div onClick={() => {
        if(window.confirm("Voulez-vous supprimer cet article ?")) {
            deleteQuote()
        }
    }}>
        <img src='./img/icons/trash.svg' alt='trash' />
        
    </div>
  )
}
