import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../Utils';
import { followUser, unfollowUser } from '../../actions/user/user.actions';

export default function FollowHandler({ idToFollow, type }) {

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    // console.log("🚀 ~ file: FollowHandler.js:10 ~ FollowHandler ~ userData:", userData)
    const [isFollowed, setIsFollowed] = useState(false);
    // console.log("🚀 ~ file: FollowHandler.js:12 ~ FollowHandler ~ isFollowed:", isFollowed)

    const handleFollow = () => {
        console.log('Suivre');
        dispatch(followUser(userData.id, idToFollow))
        setIsFollowed(true)
    }


    const handleUnFollow = () => {
        console.log('plus suivre');
        dispatch(unfollowUser(userData.id, idToFollow))
        setIsFollowed(!isFollowed)
    }

    useEffect(() => {
        if (!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true)
            } else {
                setIsFollowed(false)

            }
        }
    }, [userData, idToFollow])



    return (
        <div>
            {isFollowed && !isEmpty(userData) && (
                <span onClick={handleUnFollow}>
                    { type === "suggestion" && <button className='unfollow-btn'>Abonné</button>}
                    { type === "card" && <img src="./img/icons/checked.svg" alt="checked" />}
                </span>

            )}
            {!isFollowed && !isEmpty(userData) && (
                <span onClick={handleFollow}>
                    { type === "suggestion" && <button className='follow-btn'>Suivre</button>}
                    { type === "card" && <img src="./img/icons/check.svg" alt="check" />}

                </span>

            )}
        </div>
    )
}
