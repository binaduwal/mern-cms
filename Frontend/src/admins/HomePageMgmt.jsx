import React from 'react'
import BannerForm from '../forms/BannerForm'
import WelcomeSectionForm from '../forms/WelcomeSectionForm'
import DestinationForm from '../forms/DestinationForm'
import HomeFaqForm from '../forms/HomeFaqForm'

const HomePageMgmt = () => {
  return (
    <section className=' grid grid-cols-2 gap-8'>
      <BannerForm/>
      <DestinationForm/>
      <div className=' h-fit'>
      <WelcomeSectionForm/>
      </div>
      <HomeFaqForm/>
    </section>
  )
}

export default HomePageMgmt
