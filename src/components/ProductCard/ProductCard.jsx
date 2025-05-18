import { Image } from 'antd';
import './ProductCard.css';
import { CpuIcon, RamIcon, StorageIcon, ScreenIcon } from '../../assets/iconSVG/constants';
import { useNavigate } from 'react-router-dom';
import ProductViewHistoryService from '../../service/UserService/ProductViewHistoryService';
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const formatVND = (value) => {
  if (!value) return '';
  const number = Number(value);
  if (isNaN(number)) return value;
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const ProductCard = ({
    product_id,
    url_img,
    name,
    price,
    config_product = {},
    isDetail = false
  }) => {
    const navigate = useNavigate();
    const { user_id } = useContext(AuthContext);

    const iconTech = [
      {
        icon: <CpuIcon />,
        label: config_product?.cpu || "N/A",
      },
      {
        icon: <RamIcon />,
        label: config_product?.ram || "N/A",
      },
      {
        icon: <StorageIcon />,
        label: config_product?.storage || "N/A",
      },
      {
        icon: <ScreenIcon />,
        label: config_product?.screen || "N/A",
      },
    ];
    return (
      <div className={`section-content ${!isDetail && "detail-card"}`}  onClick={async () => {
        await ProductViewHistoryService.recordView(product_id, user_id);
      }}>
        <div className='product-card'>
          <div className='product-card-image'>
            <Image style={{width: "194", height: "129"}} src={url_img} alt={name} />
          </div>
          <div className='product-card-content'  onClick={() => navigate(`/product/${product_id}`)}>
            <div className="product-name">{name}</div>
            {isDetail && (
              <div className="technical">
                {iconTech.map((tech, index) => (
                  <div key={index} className="technical--line">
                    {tech.icon}
                    <span className="technical-label">{tech.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="product-price">
              <div className='default-price'>
                <span className='highlight'>{formatVND(price)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


export default ProductCard;
