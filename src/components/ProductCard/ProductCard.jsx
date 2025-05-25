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
    console.log("category", category);

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

    const iconHeadphone = [
      {
        icon: <MiceIcon2 />,
        label: config_product?.connectivity_type || "N/A",
      },
      {
        icon: <MiceIcon3 />,
        label: config_product?.color || "N/A",
      },
      {
        icon: <MiceIcon3 />,
        label: config_product?.battery_life || "N/A",
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

    const iconRam = [
      {
        icon: <MiceIcon1 />,
        label: config_product?.capacity || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.type || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.speed || "N/A",
      },
    ]

    const iconCpu = [
      {
        icon: <MiceIcon1 />,
        label: config_product?.cpu_type || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.socket || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.threads || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.multiplier || "N/A",
      },
    ]

    const iconVga = [
      {
        icon: <MiceIcon1 />,
        label: config_product?.architecture || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.cuda_cores || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.rt_cores || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.tensor_cores || "N/A",
      }
    ]

    const iconMainboard = [
      {
        icon: <MiceIcon1 />,
        label: config_product?.chipset || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.audio || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.integrated_graphics || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.lan || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.memory || "N/A",
      },
    ]
    const iconSsd = [
      {

        icon: <MiceIcon1 />,
        label: config_product?.capacity || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.read_speed || "N/A",
      },
      {
        icon: <MiceIcon1 />,
        label: config_product?.write_speed || "N/A",
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
                {category === "RAM" && iconRam.map((ram, index) => (
                  <div  key={index} className="technical--line">
                    {ram.icon}
                    <span className="technical-label">{ram.label}</span>
                  </div>
                ))}
                {category === "CPU" && iconCpu.map((cpu, index) => (
                  <div  key={index} className="technical--line">
                    {cpu.icon}
                    <span className="technical-label">{cpu.label}</span>
                  </div>
                ))}
                {category === "VGA" && iconVga.map((vga, index) => (
                  <div  key={index} className="technical--line">
                    {vga.icon}
                    <span className="technical-label">{vga.label}</span>
                  </div>
                ))}
                {category === "HeadPhone" && iconHeadphone.map((headphone, index) => (
                  <div  key={index} className="technical--line">
                    {headphone.icon}
                    <span className="technical-label">{headphone.label}</span>
                  </div>
                ))}
                {category === "Mainboard" && iconMainboard.map((mainboard, index) => (
                  <div  key={index} className="technical--line">
                    {mainboard.icon}
                    <span className="technical-label">{mainboard.label}</span>
                  </div>
                ))}
                {category === "SSD" && iconSsd.map((ssd, index) => (
                  <div  key={index} className="technical--line">
                    {ssd.icon}
                    <span className="technical-label">{ssd.label}</span>
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
