import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SectionSlider from './SectionSlider/SectionSlider';
import SectionContent from './SectionContent/SectionContent';
import ProductService from '../../../service/UserService/ProductService';

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
      <SectionContent title={`Sản phẩm: ${category}`} products={products} />
    </div>
  );
};

export default Home;
