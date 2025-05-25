import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SectionSlider from './SectionSlider/SectionSlider';
import SectionContent from './SectionContent/SectionContent';
import ProductService from '../../../service/UserService/ProductService';
import RecentViewSection from './SectionContent/RecentViewSection';

const DUMMY_CATEGORIES = ['Laptop', 'Headphone', 'Mice', 'Screen'];

// const getTwoRandomCategories = () => {
//     if (DUMMY_CATEGORIES.length < 2) return [DUMMY_CATEGORIES[0], DUMMY_CATEGORIES[0]];
//     const shuffled = [...DUMMY_CATEGORIES].sort(() => 0.5 - Math.random());
//     return [shuffled[0], shuffled[1]];
//   };

  const Home = () => {
    const [categories] = React.useState(DUMMY_CATEGORIES);

    const { data: products1 = [], isLoading: loading1, isError: error1, error: err1 } = useQuery({
      queryKey: ['products', DUMMY_CATEGORIES[0]],
      queryFn: () => ProductService.getProducts(DUMMY_CATEGORIES[0]),
      staleTime: 1000 * 60 * 5,
    });

    const { data: products2 = [], isLoading: loading2, isError: error2, error: err2 } = useQuery({
      queryKey: ['products', DUMMY_CATEGORIES[1]],
      queryFn: () => ProductService.getProducts(DUMMY_CATEGORIES[1]),
      staleTime: 1000 * 60 * 5,
    });

    if (loading1 || loading2) return <div className='container-fluid'>Đang tải dữ liệu...</div>;
    if (error1) return <div className='container-fluid'>Error: {err1.message}</div>;
    if (error2) return <div className='container-fluid'>Error: {err2.message}</div>;

    return (
      <div className="container-fluid">
        <SectionSlider />
        <RecentViewSection />
        <SectionContent title={`Sản phẩm: ${categories[0]}`} products={products1} category={categories[0]} />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{width: '50%'}}><img style={{width: '100%'}} src="https://file.hstatic.net/200000722513/file/thang_04_layout_web__1015x325_copy.png" alt="" /></div>
          <div style={{width: '50%'}}><img style={{width: '100%'}} src="https://file.hstatic.net/200000722513/file/thang_04_layout_web__1015x325.png" alt="" /></div>
        </div>
        <SectionContent title={`Sản phẩm: ${categories[1]}`} products={products2} category={categories[1]} />
      </div>
    );
  };
export default Home;
