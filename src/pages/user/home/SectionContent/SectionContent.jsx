import React, { useLayoutEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SectionContent.css';

const SectionContent = ({ title, products = [], isDetail = true, category }) => {
  const slidesPerView = isDetail ? 5 : 4;


  useLayoutEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div style={{ padding: '16px', backgroundColor: 'white', marginTop: '20px', marginBottom: '20px' }}>
       <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '16px'}}>
            <a href={`/category/${category}`} className='section-title'>
                {title}
            </a>
            <div className='shTitle'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 22 16"><path fill="#FF3C53" d="M18.5 4H16V2c0-1.1-.9-2-2-2H2C.9 0 0 .9 0 2v9c0 1.1.9 2 2 2 0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h1c.55 0 1-.45 1-1V8.67c0-.43-.14-.85-.4-1.2L19.3 4.4c-.19-.25-.49-.4-.8-.4ZM5 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm13.5-8.5L20.46 8H16V5.5h2.5ZM17 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"/></svg>
                    <div style={{marginLeft: '8px'}}>Miễn phí giao hàng</div>
            </div>
       </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={slidesPerView}
        navigation={isDetail}
      >
        {products.map((product, index) => (
            <SwiperSlide
                key={product.id || index}
                className={isDetail ? '' : 'custom-slide'}
            >
                <ProductCard {...product} config_product={product.config_product} isDetail={isDetail} />
            </SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
};

export default SectionContent;
