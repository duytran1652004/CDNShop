import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SectionSlider from './SectionSlider/SectionSlider';
import SectionContent from './SectionContent/SectionContent';
import ProductService from '../../../service/UserService/ProductService';
import RecentViewSection from './SectionContent/RecentViewSection';
const DUMMY_CATEGORIES = ['Laptop'];

const getRandomCategory = () =>
  DUMMY_CATEGORIES[Math.floor(Math.random() * DUMMY_CATEGORIES.length)];

const Home = () => {
  const [category] = React.useState(getRandomCategory());

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products', category],
    queryFn: () => ProductService.getProducts(category),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div className='container-fluid'>Đang tải dữ liệu...</div>;
  if (isError) return <div className='container-fluid'>Error: {error.message}</div>;

  return (
    <div className="container-fluid">
      <SectionSlider />
      <RecentViewSection />
      <SectionContent title={`Sản phẩm: ${category}`} products={products} category={category} />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{width: '50%'}}><img style={{width: '100%'}} src="https://file.hstatic.net/200000722513/file/thang_04_layout_web__1015x325_copy.png" alt="" /></div>
            <div style={{width: '50%'}}><img style={{width: '100%'}} src="https://file.hstatic.net/200000722513/file/thang_04_layout_web__1015x325.png" alt="" /></div>
      </div>
    </div>
  );
};

export default Home;
