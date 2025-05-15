import { Image } from 'antd';
import './ProductCard.css';
import { CpuIcon, RamIcon, StorageIcon, ScreenIcon } from '../../assets/iconSVG/constants';


const iconTech = [
    {
      icon: <CpuIcon />,
      label: 'i5-13420H',
    },
    {
      icon: <RamIcon />,
      label: '16 GB',
    },
    {
      icon: <StorageIcon />,
      label: '512 GB',
    },
    {
      icon: <ScreenIcon />,
      label: '14 inch FHD IPS',
    },
  ];

const ProductCard = ({
  image,
  name,
  technical,
  price,
  originalPrice,
  discount,
  specs = [],
  rating = 0,
  reviews = 0,
  isDetail = false
}) => {



  return (
    <div className="section-content">
            <div className='product-card'>
                <div className='product-card-image'>
                    <Image src={image} alt={name} />
                </div>
                <div className='product-card-content'>
                    <div className="product-name">{name}</div>
                    {isDetail && (
                        <div className="technical">
                           {iconTech.map((tech, index) => (
                            <div key={index} className="technical--line">
                                {tech.icon}
                                <span  className="technical-label">{tech.label}</span>
                            </div>
                            ))}
                        </div>
                    )}
                    <div className="product-price">
                        {isDetail && (
                        <div className='compare-price'>
                            {originalPrice && (
                                <span className='original-price'>{originalPrice}</span>
                            )}
                        </div>
                        )}
                        <div className='default-price'>
                            <span className='highlight'>{price}</span>
                            <span className='discount'>{discount}</span>
                        </div>
                    </div>
                    {isDetail && (
                        <div className="product-rating">
                        <span className="number">{rating}</span>
                        <span className="icon">★</span>
                        <span className="count">{reviews}</span>
                    </div>
                    )}
                </div>
            </div>
        </div>
  );
};

export default ProductCard;