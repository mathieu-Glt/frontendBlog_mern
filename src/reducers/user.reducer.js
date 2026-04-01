import { FOLLOW_USER, GET_USER, GET_USER_FAILURE, GET_USER_LOADING, LIKE_POST_USER, UNFOLLOW_USER, UNLIKE_POST_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/user/actions-type";

const initialState = {
    id: null,
    pseudo: null,
    email: null,
    password: null,
    bio: null,
    followers: [],
    following: [],
    likes: [],
    picture: null,
    isLoading: false,
    error: null,
    isLogged: false,
    createdAt: null

};

export default function userReducer(state = initialState, action) {
    console.log("action payload", action);
    switch(action.type) {
        case GET_USER_LOADING:
            return {
                ...state,
                isLogged: false,
                isLoading: true,
                error: null,
            }
        
        case GET_USER:
            return {
                ...state,
                id: action.payload.result._id,
                pseudo: action.payload.result.pseudo,
                email: action.payload.result.email,
                password: "password OK",
                bio: action.payload.result.bio,
                followers: action.payload.result.followers,
                following: action.payload.result.following,
                likes: action.payload.result.likes,
                picture: action.payload.result.picture,
                createdAt: action.payload.result.createdAt,
                error: null,
                isLoading: false,
                islogged: true
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload

            }
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload
            }
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }
        case FOLLOW_USER:
            return {
                ...state,
                following: [action.payload.idToFollow, ...state.following]
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter((id) => id !== action.payload.idToUnFollow)
            }
            case LIKE_POST_USER:
                return {
                    ...state,
                    likes: [action.payload.postId, ...state.likes]
                }
            case UNLIKE_POST_USER:
                return {
                     ...state,
                    likes: state.likes.filter((id) => id !== action.payload.postId)
                }
                    default:
            return state;
    }
}