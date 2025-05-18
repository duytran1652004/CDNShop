import React, { useState, useRef } from 'react';
import { Button, Space } from 'antd';
import '../SectionSlider.css';
import { ArrowRightOutlined } from '@ant-design/icons';
import ProductService from '../../../../../service/UserService/ProductService';
import { useNavigate } from "react-router-dom";

const laptopItems = [
  {
    key: '1',
    label: 'Thương hiệu',
    children: [
      { key: '1-1', label: 'ASUS' },
      { key: '1-2', label: 'ACER' },
      { key: '1-3', label: 'MSI' },
      { key: '1-4', label: 'LENOVO' },
      { key: '1-5', label: 'DELL' },
      { key: '1-6', label: 'HP - Pavilion' },
      { key: '1-7', label: 'LG - Gram' },
    ],
  },
  {
    key: '2',
    label: 'Giá bán',
    children: [
      { key: '2-1', label: 'Dưới 15 triệu',  },
      { key: '2-2', label: 'Từ 15 đến 20 triệu' },
      { key: '2-3', label: 'Trên 20 triệu' },
    ],
  },
  {
    key: '3',
    label: 'CPU Intel - AMD',
    children: [
      { key: '3-1', label: 'Intel Core i3' },
      { key: '3-2', label: 'Intel Core i5' },
      { key: '3-3', label: 'Intel Core i7' },
      { key: '3-4', label: 'AMD Ryzen 5' },
      { key: '3-5', label: 'AMD Ryzen 7' },
      { key: '3-6', label: 'AMD Ryzen 9' },
    ],
  },
  {
    key: '4',
    label: 'Bộ nhớ SSD',
    children: [
      { key: '4-1', label: '256GB' },
      { key: '4-2', label: '512GB' },
      { key: '4-3', label: '1TB' },
      { key: '4-4', label: '1TB HDD' },
    ],
  },
  {
    key: '5',
    label: 'Bộ nhớ RAM',
    children: [
      { key: '5-1', label: '4GB' },
      { key: '5-2', label: '8GB' },
      { key: '5-3', label: '16GB' },
      { key: '5-4', label: '32GB' },
    ],
  },
  {
    key: '6',
    label: 'Màn hình',
    children: [
      { key: '6-1', label: '13"' },
      { key: '6-2', label: '14"' },
      { key: '6-3', label: '15.6"' },
      { key: '6-4', label: '17"' },
    ],
  },
];

const mouseItems = [
  {
    key: '1',
    label: 'Thương hiệu chuột',
    children: [
      { key: '1-1', label: 'Logitech' },
      { key: '1-2', label: 'Razer' },
      { key: '1-3', label: 'Corsair' },
      { key: '1-4', label: 'Pulsar' },
      { key: '1-5', label: 'Microsoft' },
      { key: '1-6', label: 'Dare U' },
    ],
  },
  {
    key: '2',
    label: 'Thương hiệu lót chuột',
    children: [
      { key: '2-1', label: 'GEARVN' },
      { key: '2-2', label: 'ASUS' },
      { key: '2-3', label: 'Steelseries' },
      { key: '2-4', label: 'Dare-U' },
      { key: '2-5', label: 'Razer' },
    ],
  },
  {
    key: '3',
    label: 'Chất liệu lót chuột',
    children: [
      { key: '3-1', label: 'Nhựa' },
      { key: '3-2', label: 'Vải' },
      { key: '3-3', label: 'Nhôm' },
      { key: '3-4', label: 'Kính' },
    ],
  },
  {
    key: '4',
    label: 'Chuột theo giá tiền',
    children: [
      { key: '4-1', label: 'Dưới 500 nghìn' },
      { key: '4-2', label: 'Từ 500 nghìn - 1 triệu' },
      { key: '4-3', label: 'Từ 1 triệu - 2 triệu' },
      { key: '4-4', label: 'Trên 2 triệu - 3 triệu' },
      { key: '4-5', label: 'Trên 3 triệu' },
    ],
  },
  {
    key: '5',
    label: 'Kích thước lót chuột',
    children: [
      { key: '5-1', label: 'Small' },
      { key: '5-2', label: 'Medium' },
      { key: '5-3', label: 'Large' },
    ],
  },
  {
    key: '6',
    label: 'Kết nối chuột',
    children: [
      { key: '6-1', label: 'Bluetooth' },
      { key: '6-2', label: 'USB' },
      { key: '6-3', label: 'USB-C' },
      { key: '6-4', label: 'USB-Type-C' },
    ],
  },
  {
    key: '7',
    label: 'DPI',
    children: [
      { key: '7-1', label: '400' },
      { key: '7-2', label: '800' },
      { key: '7-3', label: '1200' },
      { key: '7-4', label: '1600' },
      { key: '7-5', label: '2400' },
      { key: '7-6', label: '3200' },
    ],
  },
  {
    key: '8',
    label: 'Màu chuột',
    children: [
      { key: '8-1', label: 'Đen' },
      { key: '8-2', label: 'Trắng' },
      { key: '8-3', label: 'Xanh' },
      { key: '8-4', label: 'Đỏ' },
    ],
  },
];

const headphoneItems = [
  {
    key: '1',
    label: 'Thương hiệu',
    children: [
      { key: '1-1', label: 'AKKO' },
      { key: '1-2', label: 'AULA' },
      { key: '1-3', label: 'Dare-U' },
      { key: '1-4', label: 'Durgod' },
      { key: '1-5', label: 'Leobog' },
      { key: '1-6', label: 'Leopold' },
      { key: '1-7', label: 'FL-Esports' },
      { key: '1-8', label: 'Steelseries' },
      { key: '1-9', label: 'Rapoo' },
      { key: '1-10', label: 'VGN' },
      { key: '1-11', label: 'Corsair' },
      { key: '1-12', label: 'E-Dra' },
      { key: '1-13', label: 'Cidoo' },
      { key: '1-14', label: 'Machenike' },
    ],
  },
  {
    key: '2',
    label: 'Giá tiền',
    children: [
      { key: '2-1', label: 'Dưới 1 triệu' },
      { key: '2-2', label: '1 triệu - 2 triệu' },
      { key: '2-3', label: '2 triệu - 3 triệu' },
      { key: '2-4', label: '3 triệu - 4 triệu' },
      { key: '2-5', label: 'Trên 4 triệu' },
    ],
  },
  {
    key: '3',
    label: 'Kết nối',
    children: [
      { key: '3-1', label: 'Bluetooth' },
      { key: '3-2', label: 'Wireless' },
    ],
  },
];

const monitorFilterItems = [
    {
      key: "1",
      label: "Loại màn hình",
      children: [
        { key: "1-1", label: "IPS" },
        { key: "1-2", label: "VA" },
        { key: "1-3", label: "TN" },
        { key: "1-4", label: "OLED" },
      ],
    },
    {
      key: "2",
      label: "Kích thước",
      children: [
        { key: "2-1", label: '21"' },
        { key: "2-2", label: '23.8"' },
        { key: "2-3", label: '24"' },
        { key: "2-4", label: '27"' },
        { key: "2-5", label: '32"' },
        { key: "2-6", label: '34"' },
        { key: "2-7", label: '49"' },
      ],
    },
    {
      key: "3",
      label: "Độ phân giải",
      children: [
        { key: "3-1", label: "1920x1080" },
        { key: "3-2", label: "2560x1440" },
        { key: "3-3", label: "3840x2160" },
        { key: "3-4", label: "5120x1440" },
      ],
    },
    {
      key: "4",
      label: "Tần số quét",
      children: [
        { key: "4-1", label: "60Hz" },
        { key: "4-2", label: "75Hz" },
        { key: "4-3", label: "120Hz" },
        { key: "4-4", label: "144Hz" },
        { key: "4-5", label: "165Hz" },
        { key: "4-6", label: "240Hz" },
      ],
    },
    {
      key: "5",
      label: "Tỉ lệ khung hình",
      children: [
        { key: "5-1", label: "16:9" },
        { key: "5-2", label: "21:9" },
        { key: "5-3", label: "32:9" },
        { key: "5-4", label: "4:3" },
      ],
    },
  ];

const labelIconButton = [
  {
    key: '1',
    label: 'Laptop',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" fill="none"><path fill="currentcolor" d="M4 1a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4Zm-.3-1h12.6c.477 0 .935.184 1.273.513.337.328.527.773.527 1.237v7c0 .464-.19.91-.527 1.237a1.826 1.826 0 0 1-1.273.513H3.7c-.477 0-.935-.184-1.273-.513A1.726 1.726 0 0 1 1.9 8.75v-7c0-.464.19-.91.527-1.237A1.826 1.826 0 0 1 3.7 0Z"/><path stroke="currentcolor" stroke-linecap="round" d="M1 12h18"/></svg>',
  },
  {
    key: '2',
    label: 'Màn hình',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" fill="none"><path fill="currentcolor" d="M4 1a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4Zm-.3-1h12.6c.477 0 .935.184 1.273.513.337.328.527.773.527 1.237v7c0 .464-.19.91-.527 1.237a1.826 1.826 0 0 1-1.273.513H3.7c-.477 0-.935-.184-1.273-.513A1.726 1.726 0 0 1 1.9 8.75v-7c0-.464.19-.91.527-1.237A1.826 1.826 0 0 1 3.7 0Z"/><path stroke="currentcolor" stroke-linecap="round" d="M1 12h18"/></svg>',
  },
  {
    key: '3',
    label: 'Chuột + Lót chuột',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" fill="none"><path fill="currentcolor" d="M4 1a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4Zm-.3-1h12.6c.477 0 .935.184 1.273.513.337.328.527.773.527 1.237v7c0 .464-.19.91-.527 1.237a1.826 1.826 0 0 1-1.273.513H3.7c-.477 0-.935-.184-1.273-.513A1.726 1.726 0 0 1 1.9 8.75v-7c0-.464.19-.91.527-1.237A1.826 1.826 0 0 1 3.7 0Z"/><path stroke="currentcolor" stroke-linecap="round" d="M1 12h18"/></svg>',
  },
  {
    key: '4',
    label: 'Tai nghe',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" fill="none"><path fill="currentcolor" d="M4 1a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4Zm-.3-1h12.6c.477 0 .935.184 1.273.513.337.328.527.773.527 1.237v7c0 .464-.19.91-.527 1.237a1.826 1.826 0 0 1-1.273.513H3.7c-.477 0-.935-.184-1.273-.513A1.726 1.726 0 0 1 1.9 8.75v-7c0-.464.19-.91.527-1.237A1.826 1.826 0 0 1 3.7 0Z"/><path stroke="currentcolor" stroke-linecap="round" d="M1 12h18"/></svg>',
  },
];

const itemsMap = {
  Laptop: laptopItems,
  'Chuột + Lót chuột': mouseItems,
  'Tai nghe': headphoneItems,
  'Màn hình': monitorFilterItems,
};

const DropDown = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const leftSliderRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = (label) => {
    setHoveredButton(label);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleLaptopFilter = (group, value) => {
    const paramKeyMap = {
      "Thương hiệu": "brand",
      "CPU Intel - AMD": "cpu",
      "Bộ nhớ SSD": "storage",
      "Bộ nhớ RAM": "ram",
      "Màn hình": "screen",
    };

    const key = paramKeyMap[group];
    if (!key) return;

    const query = `${key}=${encodeURIComponent(value)}`;
    navigate(`/collection/laptop?${query}`);
  };

  const handleScreenFilter = (group, value) => {
    const paramMap = {
      "Loại màn hình": "screen_type",
      "Kích thước": "screen_size",
      "Độ phân giải": "resolution",
      "Tần số quét": "refresh_rate",
      "Tỉ lệ khung hình": "aspect_ratio",
    };

    const key = paramMap[group];
    if (!key) return;

    const query = `${key}=${encodeURIComponent(value)}`;
    navigate(`/collection/screen?${query}`);
  };

  return (
    <div className="section-slider">
      <div className="left-slider" ref={leftSliderRef}>
        <div className="menu-wrapper" onMouseEnter={() => handleMouseEnter(null)} onMouseLeave={handleMouseLeave}>
          {labelIconButton.map((buttonItem) => (
            <div key={buttonItem.key} className="menu-container">
              <Button
                className="mega-link"
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  paddingTop: 5,
                  paddingBottom: 5,
                  height: 40,
                }}
                onMouseEnter={() => handleMouseEnter(buttonItem.label)}
              >
                <a>
                  <span
                    style={{ marginRight: '8px' }}
                    dangerouslySetInnerHTML={{ __html: buttonItem.icon }}
                  />
                  {buttonItem.label}
                </a>
                <ArrowRightOutlined />
              </Button>
            </div>
          ))}
          {hoveredButton && itemsMap[hoveredButton] && (
            <div className="expanded-menu">
              {itemsMap[hoveredButton].map((topLevelItem) => (
                <div key={topLevelItem.key} className="menu-section">
                  <div className="menu-item top-level">{topLevelItem.label}</div>
                  {topLevelItem.children && (
                    <div className="submenu">
                      {topLevelItem.children.map((secondLevelItem) => (
                        <div
                        key={secondLevelItem.key}
                        className="menu-item"
                        onClick={() => {
                            if (hoveredButton === "Laptop") {
                              handleLaptopFilter(topLevelItem.label, secondLevelItem.label);
                            } else if (hoveredButton === "Màn hình") {
                              handleScreenFilter(topLevelItem.label, secondLevelItem.label);
                            }
                          }}
                      >
                        {secondLevelItem.label}
                      </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDown;