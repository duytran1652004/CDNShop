import { Image } from 'antd';
import './ProductCard.css';
import { CpuIcon, RamIcon, StorageIcon, ScreenIcon, MiceIcon1, MiceIcon2, MiceIcon3 } from '../../assets/iconSVG/constants';
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
    isDetail = false,
    category
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

    const iconMice = [
        {
            icon: <MiceIcon1 />,
            label: config_product?.color || "N/A",
        },
        {
            icon: <MiceIcon2 />,
            label: config_product?.connectivity_type || "N/A",
        },
        {
            icon: <MiceIcon3 />,
            label: config_product?.dpi || "N/A",
        },
    ]

    const iconMousepad = [
      {
        icon: <MiceIcon1 />,
        label: config_product?.size || "N/A",
      },
      {
        icon: <MiceIcon2 />,
        label: config_product?.material || "N/A",
      },
      {
        icon: <MiceIcon3 />,
        label: config_product?.color || "N/A",
      },
    ]

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

                {category === "Laptop" && iconTech.map((tech, index) => (
                  <div key={index} className="technical--line">
                    {tech.icon}
                    <span className="technical-label">{tech.label}</span>
                  </div>
                ))}

                {category === "Mice" && iconMice.map((mice, index) => (
                  <div key={index} className="technical--line">
                    {mice.icon}
                    <span className="technical-label">{mice.label}</span>
                  </div>
                ))}
                {category === "Mousepad" && iconMousepad.map((mousepad, index) => (
                  <div  key={index} className="technical--line">
                    {mousepad.icon}
                    <span className="technical-label">{mousepad.label}</span>
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
