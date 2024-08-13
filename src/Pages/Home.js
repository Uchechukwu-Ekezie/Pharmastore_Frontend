import React from 'react'
import CategoryList from '../Component/CategoryList'
import BannerProduct from '../Component/BannerProduct'
import HorizontalCardProduct from '../Component/HorizontalCardProduct'

function Home() {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"firstaid"} heading={"Top's First Aids"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
    </div>
  )
}

export default Home