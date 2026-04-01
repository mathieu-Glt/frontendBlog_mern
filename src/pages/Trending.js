import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import { useSelector } from 'react-redux'
import LeftNav from '../components/LeftNav'
import { isEmpty } from '../components/Utils'
import Card from '../components/Post/Card'
import Trends from '../components/Trends'

export default function Trending() {

  const uid = useContext(UidContext)
  console.log("🚀 ~ file: Trending.js:11 ~ Trending ~ uid:", uid)
  const trenList = useSelector((state) => state.trend)
  console.log("🚀 ~ file: Trending.js:13 ~ Trending ~ trenList:", trenList)

  return (
    <div className='trending-page'>
        <LeftNav />
        <div className='main'>
            <ul>
              {!isEmpty(trenList[0]) && trenList.map((post) => <Card post={post} key={post._id} />)}
            </ul>
        </div>
        <div className='right-side'>
          <div className='right-side-container'>
            <Trends />
          </div>
        </div>
    </div>
  )
}
