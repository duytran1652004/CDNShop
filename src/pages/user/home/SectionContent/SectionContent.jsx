import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const products = [
  {
    layout: 'horizontal',
    image: 'https://product.hstatic.net/200000722513/product/nitro-v_755588bd95514b6386940d73d3951e2d_1024x1024_95ef516ce29440e4ad51dedbab0e352c_large.png',
    name: 'PC GVN Intel i5-12400F/ VGA RX 7600',
    price: "16.990.000",
    originalPrice: "18.520.000",
    discount: '-8%',
    specs: ['i5 12400F', 'RX7600', 'B760', '8GB', '500GB'],
    rating: 0.0,
    reviews: 0,
    status: 'Sản phẩm mới',
  },
  {
    layout: 'horizontal',
    image: 'https://product.hstatic.net/200000722513/product/ava_ecb79fdbde454bfd87bf7ccd8675e972.png',
    name: 'PC GVN Intel Core Ultra 7 265KF/ VGA RTX 5080',
    price: "71.990.000",
    originalPrice: "76.230.000",
    discount: '-6%',
    specs: ['Ultra 7 265KF', 'RTX 5080', 'Z890', '16GB', '1TB'],
    rating: 0.0,
    reviews: 0,
    status: 'Sản phẩm mới',
  },
  {
    layout: 'horizontal',
    image: 'https://product.hstatic.net/200000722513/product/loq_15irx9_ct1_01_e2e64ca5dbd941cf95933becae145edf.png',
    name: 'PC GVN Intel i9-14900K/ VGA RTX 5090',
    price: "52.390.000",
    originalPrice: "58.000.000",
    discount: '-14%',
    specs: ['i9 14900K', 'RTX 5090', 'Z790', '32GB', '1TB'],
    rating: 5.0,
    reviews: 1,
    status: 'Sản phẩm mới',
  },
  {
    layout: 'horizontal',
    image: 'https://product.hstatic.net/200000722513/product/loq_15irx9_ct1_01_e2e64ca5dbd941cf95933becae145edf.png',
    name: 'PC GVN Intel Core Ultra 7 265KF/ VGA RTX 5070',
    price: "37.990.000",
    originalPrice: "40.330.000",
    discount: '-6%',
    specs: ['Ultra 7 265KF', 'RTX 5070', 'Z890', '16GB', '1TB'],
    rating: 0.0,
    reviews: 0,
    status: 'Sản phẩm mới',
  },
  {
    layout: 'horizontal',
    image: 'https://product.hstatic.net/200000722513/product/676vn_21da8c4630014f808b321b3d32118291_69f68ad8d3be44b385bb3da80ec4a9ee.png',
    name: 'PC GVN Intel Core Ultra 7 265KF/ VGA RTX 3060',
    price: "35.490.000",
    originalPrice: "37.830.000",
    discount: '-6%',
    specs: ['Ultra 7 265KF', 'RTX 3060', 'Z890', '16GB', '1TB'],
    rating: 0.0,
    reviews: 0,
    status: 'Sản phẩm mới',
  },
  {
    layout: 'horizontal',
    image: 'https://product.hstatic.net/200000722513/product/nitro-v_755588bd95514b6386940d73d3951e2d_1024x1024_eb2e1844722a4c75a43a97b6ae10ac66.png',
    name: 'PC GVN Intel i7-12700F/ VGA RTX 4060',
    price: "24.990.000",
    originalPrice: "26.990.000",
    discount: '-7%',
    specs: ['i7 12700F', 'RTX 4060', 'B760', '16GB', '500GB'],
    rating: 0.0,
    reviews: 0,
    status: 'Sản phẩm mới',
  },
      {
    layout: 'vertical',
    image: 'https://product.hstatic.net/200000722513/product/ictus_16_80w_micasilver_nt_hdcam_nonfpr_nonodd_victusamd_coreset_front_5be4570401b74248974f3281e277d7c3.jpg',
    name: 'Laptop gaming Acer Victus 16 80W',
    price: "32.990.000",
    originalPrice: null,
    discount: null,
    specs: [],
    rating: 0.0,
    reviews: 0,
    status: '',
  },
  {
    layout: 'vertical',
    image: 'https://product.hstatic.net/200000722513/product/lenovo_v14_g4_iru_ct1_09_cec3749729ee42f3ab1b318c2348639e.png',
    name: 'Tai nghe Bluetooth Jabra Elite 65t',
    price: "4.150.000",
    originalPrice: null,
    discount: null,
    specs: [],
    rating: 0.0,
    reviews: 0,
    status: '',
  },
  {
    layout: 'vertical',
    image: 'https://product.hstatic.net/200000722513/product/r3l6_1b5292409d0c4f15ab545f6f766694e3_9a765ea64cf74899942ae8995814b488.png',
    name: 'Laptop gaming MSI Thin 15 B13UC 2044VN',
    price: "19.490.000",
    originalPrice: "22.990.000",
    discount: '-15%',
    specs: [],
    rating: 0.0,
    reviews: 0,
    status: '',
  },
  {
    layout: 'vertical',
    image: 'https://product.hstatic.net/200000722513/product/sus-expertbook-p1-p1403cva-i5se16-50w_cba58ce14b05424d8221224600b680f4_359e569240a14ee9badb38ed3dcacd27.png',
    name: 'PC GVN Dragon GODLIKE (Intel Core Ultra 9 285K/ VGA...)',
    price: "178.990.000",
    originalPrice: "199.720.000",
    discount: '-10%',
    specs: [],
    rating: 0.0,
    reviews: 0,
    status: '',
  },
];

const SectionContent = ({ layout = 'horizontal', title}) => {
  const filteredProducts = products.filter((product) => product.layout === layout);

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
          <SwiperSlide key={index}>
            <ProductCard {...product} isDetail  />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SectionContent;