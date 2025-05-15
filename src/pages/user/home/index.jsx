import React from 'react'
import SectionSlider from './SectionSlider/SectionSlider'
import SectionContent from './SectionContent/SectionContent'

const Home = () => {
  return (
    <div className='container-fluid'>
        <SectionSlider />
        <SectionContent title='Laptop Gaming' />
    </div>
  )
}

export default Home