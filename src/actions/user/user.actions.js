import axios from "axios";
import { FOLLOW_USER, GET_USER, GET_USER_FAILURE, GET_USER_LOADING, UNFOLLOW_USER, UPDATE_BIO, UPLOAD_PICTURE } from "./actions-type";


export const getUser = (uid) => {
    // console.log("🚀 ~ file: user.actions.js:6 ~ getUser ~ uid:", uid)
    return (dispatch) => {
        dispatch({ type: GET_USER_LOADING })
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                if (res.status === 200) {

                    dispatch({ type: GET_USER, payload: res.data });
                }
            })
            .catch((err) => {
                dispatch({ type: GET_USER_FAILURE, payload: err.message })
                // console.log(err)
            });
    };
};

export const uploadPicture = (data, id) => {
    // console.log("🚀 ~ file: user.actions.js:25 ~ uploadPicture ~ data:", data)
    return (dispatch) => {
        return axios.post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
            .then((res) => {
                if (res.status === 200) {
                    console.log('status  200');
                    console.log('results picture : ', res.data.result.picture);
                    dispatch({ type: UPLOAD_PICTURE, payload: res.data.result.picture })

                }
            })
            .catch((err) => console.log(err))

    }
}

export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { bio }
        })
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload: bio })
            })
            .catch((err) => console.log(err))
    }
}

export const followUser = (followerId, idToFollow) => {
    console.log("🚀 ~ file: user.actions.js:56 ~ followUser ~ idToFollow:", idToFollow)
    console.log("🚀 ~ file: user.actions.js:56 ~ followUser ~ followerId:", followerId)
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
            data: { idToFollow }
        })
        .then((res) => {
            dispatch({ type: FOLLOW_USER, payload: { idToFollow }})
        })
        .catch((err) => console.log(err))
    }
}

export const unfollowUser = (followerId, idToUnFollow) => {
    console.log("🚀 ~ file: user.actions.js:572 ~ followUser ~ idToFollow:", idToUnFollow)
    console.log("🚀 ~ file: user.actions.js:572 ~ followUser ~ followerId:", followerId)
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
            data: { idToUnFollow }
        })
        .then((res) => {
            dispatch({ type: UNFOLLOW_USER, payload: { idToUnFollow }})
        })
        .catch((err) => console.log(err))
    }
}