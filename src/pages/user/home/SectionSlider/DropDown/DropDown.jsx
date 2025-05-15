import React, { useState, useRef } from 'react';
import { Button, Space } from 'antd';
import '../SectionSlider.css';
import { ArrowRightOutlined } from '@ant-design/icons';

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
      { key: '2-1', label: 'Dưới 15 triệu' },
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
      { key: '3-4', label: 'AMD Ryzen' },
    ],
  },
  {
    key: '4',
    label: 'Nhu cầu sử dụng',
    children: [
      { key: '4-1', label: 'Đồ họa - Studio' },
      { key: '4-2', label: 'Học sinh - Sinh viên' },
      { key: '4-3', label: 'Mỏng nhẹ cao cấp' },
    ],
  },
  {
    key: '5',
    label: 'Linh phụ kiện Laptop',
    children: [
      { key: '5-1', label: 'Ram laptop' },
      { key: '5-2', label: 'SSD laptop' },
      { key: '5-3', label: 'Ổ cứng di động' },
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
    label: 'Các loại lót chuột',
    children: [
      { key: '3-1', label: 'Mềm' },
      { key: '3-2', label: 'Cứng' },
      { key: '3-3', label: 'Dày' },
      { key: '3-4', label: 'Mỏng' },
      { key: '3-5', label: 'Viền có led' },
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
    label: 'Loại Chuột',
    children: [
      { key: '5-1', label: 'Chuột chơi game' },
      { key: '5-2', label: 'Chuột văn phòng' },
    ],
  },
  {
    key: '6',
    label: 'Logitech',
    children: [
      { key: '6-1', label: 'Logitech Gaming' },
      { key: '6-2', label: 'Logitech Văn phòng' },
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
  {
    key: '4',
    label: 'Phụ kiện bàn phím có',
    children: [
      { key: '4-1', label: 'Keycaps' },
      { key: '4-2', label: 'Dwarf Factory' },
      { key: '4-3', label: 'Kẻ tay' },
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

// Map button labels to their respective items
const itemsMap = {
  Laptop: laptopItems,
  'Chuột + Lót chuột': mouseItems,
  'Tai nghe': headphoneItems,
};

const DropDown = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const leftSliderRef = useRef(null);

  const handleMouseEnter = (label) => {
    setHoveredButton(label);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
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
                        <div key={secondLevelItem.key} className="menu-item">
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