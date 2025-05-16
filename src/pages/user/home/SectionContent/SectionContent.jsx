import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SectionContent = ({ layout = 'horizontal', title, products = [] }) => {
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => product.layout === layout || !product.layout)
    : [];

  const slidesPerView = layout === 'horizontal' ? 5 : 4;

  return (
    <div style={{ padding: '16px', backgroundColor: 'white' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        {title}
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={slidesPerView}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: layout === 'horizontal' ? 3 : 2 },
          1024: { slidesPerView: layout === 'horizontal' ? 4 : 3 },
          1280: { slidesPerView: layout === 'horizontal' ? 4 : 3 },
          1440: { slidesPerView: slidesPerView },
        }}
      >
        {filteredProducts.map((product, index) => (
          <SwiperSlide key={product.id || index}>
            <ProductCard {...product} config_product={product.config_product} isDetail />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SectionContent;
