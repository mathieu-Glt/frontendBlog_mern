import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from '../../components/AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post/post.actions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function LikeButton({ post }) {
    // console.log("🚀 ~ file: LikeButton.js:5 ~ LikeButton ~ post:", post)
    
    const [liked, setLiked] = useState(false);
    // const uid = useContext(UidContext);
    const dispatch = useDispatch()
    // const Component = uid.user._id && !liked ? FavoriteBorderIcon : FavoriteIcon

    // useEffect(() => {
    //     if(uid && uid.user._id && !liked) {
    //         if (post.likers.includes(uid.user._id)) setLiked(true)
    //         else setLiked(false)
    //     }
    // }, [post.likers, liked])
    // // console.log("🚀 ~ file: LikeButton.js:9 ~ LikeButton ~ uid:", uid)

    // const like = () => {
    //     console.log('like post !');
    //     if(uid && uid.user._id && !liked) {
    //         dispatch(likePost(post._id, uid.user._id))
    //         setLiked(true)
    //     }
    // }



//     const unlike = () => {
//         console.log('not like post !');
//         if(uid && uid.user._id && !liked) {
//             dispatch(unlikePost(post._id, uid.user._id))
//             setLiked(false)
//         }

//     }

// if(!uid || !uid.user) {
//     return 
// }

    return (
        <div className='like-container'>
            {/* {uid.user._id === null && ( */}
                <Popup
                    trigger={<img src="./img/icons/heart.svg" alt="like" />}
                    position={["bottom center", "bottom right", "bottom left"]}
                    closeOnDocumentClick
                >
                    <div>Connectez-vous pour aimer un post !</div>
                </Popup>
            {/* // )} */}
            {/* {uid.user._id && liked === false && (
                // <><p>pas liké </p><img src="./img/icons/heart.svg" alt="like"  onClick={like} /></>
                // <><p>pas liké </p><a onClick={like} ><Component style={{ color: "red", width: "40px", height: "40px", cursor: "pointer"  }}/></a></>
                
            )}
            {uid.user._id && liked  && (
                // <><p>liké</p><img src="./img/icons/heart.svg" alt="unlike" onClick={unlike}  /></>
                // <><p>liké</p><a onClick={unlike} ><Component style={{ color: "red", width: "40px", height: "40px", cursor: "pointer" } }/></a></>

            )} */}
        </div>
    )
}
