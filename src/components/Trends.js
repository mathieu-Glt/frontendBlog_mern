import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from './Utils'
import { getTrends } from '../actions/post/post.actions'
import { NavLink } from 'react-router-dom'
import ReactPlayer from 'react-player'

export default function Trends() {

    const posts = useSelector((state) => state.post)
    console.log("🚀 ~ file: Trends.js:7 ~ Trends ~ posts:", posts[0])
    const usersData = useSelector((state) => state.users)
    console.log("🚀 ~ file: Trends.js:9 ~ Trends ~ usersData:", usersData)
    const trenList = useSelector((state) => state.trend)
    console.log("🚀 ~ file: Trends.js:14 ~ Trends ~ trenList:", trenList)
    const dispatch = useDispatch()


    useEffect(() => {
        if (!isEmpty(posts[0])) {
            const postsArr = Object.keys(posts).map((i) => posts[i])
            console.log("🚀 ~ file: Trends.js:17 ~ useEffect ~ postsArr:", postsArr)
            let sortedArray = postsArr.sort((a, b) => {
                console.log("b.likers.length ", b.likers)
                console.log("a.likers.length ", a.likers)
                return b.likers.length - a.likers.lenght
            })
            console.log("🚀 ~ file: Trends.js:26 ~ sortedArray ~ sortedArray:", sortedArray)
            sortedArray.length = 3;
            console.log("🚀 ~ file: Trends.js:21 ~ sortedArray ~ sortedArray:", sortedArray)
            dispatch(getTrends(sortedArray))
        }
    }, [posts, dispatch])

    return (
        <div className='trending-container'>
            <h4>Trending</h4>
            <NavLink to="/trending">
                <ul>
                    {trenList.length &&
                        trenList.map((post) => {
                            return (
                                <li key={post.id}>
                                    <div>
                                        {post.picture && <img src={'./uploads/profil/' + post.picture} alt='post-pic' />}
                                        {post.video && (
                                            <ReactPlayer url={post.video} />
                                        )}
                                        {/* {isEmpty(post.picture) && isEmpty(post.video) && ( */}
                                            {/* <img src={
                                                !isEmpty(usersData) &&
                                                usersData
                                                    .map((user) => {
                                                        console.log('User:', user)
                                                        if (user._id === post.posterId) return './uploads/profil/' + user.picture;
                                                    })
                                                    .join('')
                                            }
                                                alt='poster-pic'
                                            /> */}
                                        {/* )} */}
                                    </div>
                                    <div className='trend-content'>
                                        <p>{post.message}</p>
                                        <span>Lire</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </NavLink>

        </div>
    )
}
