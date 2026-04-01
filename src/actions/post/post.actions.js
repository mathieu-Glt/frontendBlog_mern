import axios from "axios";
import { ADD_COMMENT, ADD_POST, DELETE_COMMENT, DELETE_POST, EDIT_COMMENT, GET_ALL_POSTS, GET_POSTS, GET_POST_ERRORS, GET_TRENDS, LIKE_POST, UNLIKE_POST, UPDATE_POST } from "./actions-type";
import { LIKE_POST_USER, UNLIKE_POST_USER } from "../user/actions-type";




export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then((res) => {
                const array = res.data.posts.slice(0, num)
                dispatch({ type: GET_POSTS, payload: array })
                dispatch({ type: GET_ALL_POSTS, payload: res.data.posts })
            })
            .catch((err) => console.log(err))
    }
}

export const likePost = (postId, userId) => {
    console.log("🚀 ~ file: post.actions.js:19 ~ likePost ~ userId:", userId)
    console.log("🚀 ~ file: post.actions.js:19 ~ likePost ~ postId:", postId)
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
            data: { id: userId }
        })
            .then((res) => {
                console.log("🚀 ~ file: post.actions.js:26 ~ .then ~ res:", res.data.result.post._id)
                console.log("🚀 ~ file: post.actions.js:27 ~ .then ~ res:", res.data.result.user._id)
                dispatch({ type: LIKE_POST, payload: { postId, userId } })
                dispatch({ type: LIKE_POST_USER, payload: { postId } })
            })
            .catch((err) => console.log(err))
    }
}

export const unlikePost = (postId, userId) => {
    console.log("🚀 ~ file: post.actions.js:39 ~ unlikePost ~ userId:", userId)
    console.log("🚀 ~ file: post.actions.js:39 ~ unlikePost ~ postId:", postId)
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
            data: { id: userId }
        })
            .then((res) => {
                dispatch({ type: UNLIKE_POST, payload: { postId, userId } })
                dispatch({ type: UNLIKE_POST_USER, payload: { postId } })
            })
            .catch((err) => console.log(err))
    }
}

export const updatePost = (postId, message) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data: { message }
        })
            .then((res) => {
                dispatch({ type: UPDATE_POST, payload: { message, postId } })
            })
            .catch((err) => console.log(err))
    }
}

export const deletePost = (postId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        })
            .then((res) => {
                dispatch({ type: DELETE_POST, payload: { postId } })
            })
            .catch((err) => console.log(err))
    }
}

export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
            data: { commenterId, text, commenterPseudo }
        })
            .then((res) => {
                dispatch({ type: ADD_COMMENT, payload: { postId, commenterId, text, commenterPseudo } })
            })
            .catch((err) => console.log(err))

    }
}

export const editComment = (postId, commentId, text) => {
    console.log("🚀 ~ file: post.actions.js:99 ~ editComment ~ text:", text)
    console.log("🚀 ~ file: post.actions.js:100 ~ editComment ~ commentId:", commentId)
    console.log("🚀 ~ file: post.actions.js:101 ~ editComment ~ postId:", postId)
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
            data: { commentId, text  }
        })
            .then((res) => {
                dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text  } })
            })
            .catch((err) => console.log(err))

    }
}

export const deleteComment = (postId, commentId) => {
    console.log("🚀 ~ file: post.actions.js:100 ~ editComment ~ commentId:", commentId)
    console.log("🚀 ~ file: post.actions.js:101 ~ editComment ~ postId:", postId)
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
            data: { commentId }
        })
            .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: { postId, commentId} })
            })
            .catch((err) => console.log(err))

    }
}

// export const addComment = (postId, commenterId, text, commenterPseudo) => {
//     return (dispatch) => {
//         return axios({
//             method: "patch",
//             url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
//             data: { commenterId, text, commenterPseudo }
//         })
//             .then((res) => {
//                 dispatch({ type: ADD_COMMENT, payload: { postId, commenterId, text, commenterPseudo } })
//             })
//             .catch((err) => console.log(err))

//     }
// }

export const addPost =  (data) => {
    console.log("🚀 ~ file: post.actions.js:134 ~ addPost ~ data:", data)
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/post/`,
            data: data,
        }) 
        .then((res) => {
            if(res.data.errors) {
                dispatch({ type: GET_POST_ERRORS, payload: res.data.errors })
            } else {
                dispatch({ type: GET_POST_ERRORS, payload: "" })
            }
        }) 
        .catch((error) => console.log(error))      
    };
};



// export const addPost =  (data) => {
//     console.log("🚀 ~ file: post.actions.js:134 ~ addPost ~ data:", data)
//     return (dispatch) => {
//       return axios
//         .post(`${process.env.REACT_APP_API_URL}api/post/`, data, { timeout: 10000 })
//         .then((res) => {
//             console.log("🚀 ~ file: post.actions.js:139 ~ .then ~ res:", res.data.errors)
//             if(res.data.errors) {
//                 dispatch({ type: GET_POST_ERRORS, payload: res.data.errors })
//             } else {
//                 dispatch({ type: GET_POST_ERRORS, payload: "" })
//             }
//         })
//         .catch((error) => {
//             console.log("🚀 ~ file: post.actions.js:143 ~ return ~ error:", error)
//         })
        
//     };
// };
  
export const getTrends = (sortedArray) => {
    return (dispatch) => {
        dispatch({ type: GET_TRENDS, payload: sortedArray })
    }
}




