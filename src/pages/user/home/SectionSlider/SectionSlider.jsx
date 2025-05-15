import DropDown from './DropDown/DropDown'
import Banner from './Banner/Banner'
import './SectionSlider.css'

const SectionSlider = () => {
  return (
    <div className='section-slider'>
        <div className="left-slider">
            <DropDown />
        </div>
        <div className="right-slider">
            <Banner />
        </div>
    </div>
  )
}

export default SectionSlider