import React from 'react';
import { Carousel } from 'antd';

const Banner = () => {
  const onChange = currentSlide => {
    // console.log(currentSlide);
  };
  return (
    <>
        <div className="banner-left">
            <div className="top">
                <Carousel afterChange={onChange} style={{width: '100%'}} autoplay={true} autoplaySpeed={2000}>
                    <div style={{borderRadius: '10px'}}>
                        <img src="https://file.hstatic.net/200000722513/file/thang_04_laptop_gaming_banner_web_slider_800x400.jpg" alt="banner1" />
                    </div>
                    <div style={{borderRadius: '10px'}}>
                        <img src="https://file.hstatic.net/200000722513/file/thang_04_pc_tang_man_banner_web_slider_800x400.jpg" alt="banner2" />
                    </div>
                    <div style={{borderRadius: '10px'}}>
                        <img src="https://file.hstatic.net/200000722513/file/man_hinh_thang_04_banner_web_slider_800x400.jpg" alt="banner3" />
                    </div>
                </Carousel>
            </div>
            <div className="bottom">
               <div className="list">
                    <div className="item">
                        <a href="">
                            <img src="https://file.hstatic.net/200000722513/file/thang_04_layout_web_-05.png" alt="" />
                        </a>
                    </div>
                    <div className="item">
                        <a href="">
                            <img src="https://file.hstatic.net/200000722513/file/thang_04_layout_web_-04.png" alt="" />
                        </a>
                    </div>
               </div>
            </div>
        </div>
        <div className="banner-right">
            <div className="list">
                <div className="item">
                    <a href="">
                        <img src="https://file.hstatic.net/200000722513/file/thang_04_layout_web_-07.png" alt="" />
                    </a>
                </div>
                <div className="item">
                    <a href="">
                        <img src="https://file.hstatic.net/200000722513/file/thang_04_layout_web_-04.png" alt="" />
                    </a>
                </div>
                <div className="item">
                    <a href="">
                        <img src="https://file.hstatic.net/200000722513/file/thang_04_layout_web_-03.png" alt="" />
                    </a>
                </div>
            </div>
        </div>
    </>
  );
};
export default Banner;