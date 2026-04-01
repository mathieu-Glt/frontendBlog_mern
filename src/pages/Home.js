import React, { useContext } from 'react'
import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread'
import NewPostForm from '../components/Post/NewPostForm'
import Log from '../components/Log'
import { UidContext } from '../components/AppContext'
import Trends from '../components/Trends'
import FriendsHint from '../components/Profil/FriendsHint'
import { useSelector } from 'react-redux'

export default function Home() {

  const uid = useContext(UidContext)
  console.log("🚀 ~ file: Home.js:11 ~ Home ~ uid:", uid)
  const userData = useSelector((state) => state.user)
  console.log("🚀 ~ file: Home.js:16 ~ Home ~ userData:", userData)
  const usersData = useSelector((state) => state.users)
  console.log("🚀 ~ file: Home.js:18 ~ Home ~ usersData:", usersData)
  const posts = useSelector((state) => state.posts);
  console.log("🚀 ~ file: Home.js:20 ~ Home ~ posts:", posts)


  return (
    <div className='home'>
      <LeftNav />
      <div className='main'>
        <div className='home-header'>
          {uid && uid.user._id && uid.user._id ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
      <div className='right-side'>
        <div className='right-side-container'>
          <div className='wrapper'>
            <h4>Trending</h4>
            <Trends />
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  )
}
