import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../Utils'
import FollowHandler from './FollowHandler'

export default function FriendsHint() {

  const [isLoading, setIsLoading] = useState(true)
  const [playOne, setPlayOne] = useState(true)
  const [friendsHint, setFirendsHint] = useState([])
  console.log("🚀 ~ file: FriendsHint.js:10 ~ FriendsHint ~ friendsHint:", friendsHint)
  const userData = useSelector((state) => state.user)
  console.log("🚀 ~ file: FriendsHint.js:7 ~ FriendsHint ~ userData:", userData)
  const usersData = useSelector((state) => state.users)
  console.log("🚀 ~ file: FriendsHint.js:9 ~ FriendsHint ~ usersData:", usersData)

  const notfriendList = () => {
    let array = [];
    usersData.map((user) => {
      if(user._id !== userData.id && user.followers.includes(userData.id))
        return array.push(user._id)
    })
    array.sort(() => 0.5 - Math.random())
    if (window.innerHeight > 780) {
      array.length = 5
    } else if (window.innerHeight > 720) {
      array.length = 4

    } else if (window.innerHeight > 615) {
      array.length = 2

    } else if (window.innerHeight > 540) {
      array.length = 1
    } else {
      array.length = 0
    }
    
    setFirendsHint(array)
    console.log('array : ', array);
  }

  useEffect(() => {
    if(playOne && !isEmpty(usersData[0]) && !isEmpty(userData.id)) {
      notfriendList()
      setIsLoading(false)
      setPlayOne(false)
    }
  }, [usersData, userData, playOne])


  return (
    <div className='get-friends-container'>
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className='icon'>
          <i className='fas fa-spinner fa-pulse'></i>
        </div>
      ) : (
        <ul>
          {friendsHint && friendsHint.map((user) => {
            for (let i = 0; i < usersData.length; i++) {
              if(user === usersData[i]._id) {
                return <li className='user-hint' key={user}>
                  <img src={'./uploads/profil/' + usersData[i].picture} alt='user-pic' />
                  <p>{usersData[i].pseudo}</p>
                  <FollowHandler idToFollow={usersData[i]._id} type={"suggestion"} />
                </li> 
              }
              
            }
          })}
        </ul>
      )}
    </div>
  )
}
