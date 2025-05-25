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
      { key: '8-5', label: 'Vàng' },
      { key: '8-6', label: 'Tím' },
      { key: '8-7', label: 'Hồng' },
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

const cpuItems = [
    {
      key: '1',
      label: 'Thương hiệu',
      children: [
        { key: '1-1', label: 'Intel' },
        { key: '1-2', label: 'AMD' },
      ],
    },
    {
      key: '2',
      label: 'Loại CPU',
      children: [
        { key: '2-1', label: 'Core i3' },
        { key: '2-2', label: 'Core i5' },
        { key: '2-3', label: 'Core i7' },
        { key: '2-4', label: 'Core i9' },
        { key: '2-5', label: 'Ryzen 3' },
        { key: '2-6', label: 'Ryzen 5' },
        { key: '2-7', label: 'Ryzen 7' },
        { key: '2-8', label: 'Ryzen 9' },
      ],
    },
    {
      key: '3',
      label: 'Socket',
      children: [
        { key: '3-1', label: 'LGA 1200' },
        { key: '3-2', label: 'LGA 1700' },
        { key: '3-3', label: 'AM4' },
        { key: '3-4', label: 'AM5' },
      ],
    },
    {
      key: '4',
      label: 'Threads',
      children: [
        { key: '4-1', label: '4' },
        { key: '4-2', label: '6' },
        { key: '4-3', label: '8' },
        { key: '4-4', label: '12' },
        { key: '4-5', label: '16' },
      ],
    },
    {
      key: '5',
      label: 'Multiplier',
      children: [
        { key: '5-1', label: 'Yes' },
        { key: '5-2', label: 'No' },
      ],
    },
    {
      key: '6',
      label: 'Giá tiền',
      children: [
        { key: '6-1', label: 'Dưới 3 triệu' },
        { key: '6-2', label: '3 - 5 triệu' },
        { key: '6-3', label: '5 - 8 triệu' },
        { key: '6-4', label: 'Trên 8 triệu' },
      ],
    },
];

const ramItems = [
    {
      key: '1',
      label: 'Thương hiệu',
      children: [
        { key: '1-1', label: 'Corsair' },
        { key: '1-2', label: 'G.Skill' },
        { key: '1-3', label: 'Kingston' },
        { key: '1-4', label: 'TeamGroup' },
        { key: '1-5', label: 'ADATA' },
      ],
    },
    {
      key: '2',
      label: 'Dung lượng',
      children: [
        { key: '2-1', label: '4GB' },
        { key: '2-2', label: '8GB' },
        { key: '2-3', label: '16GB' },
        { key: '2-4', label: '32GB' },
      ],
    },
    {
      key: '3',
      label: 'Loại RAM',
      children: [
        { key: '3-1', label: 'DDR3' },
        { key: '3-2', label: 'DDR4' },
        { key: '3-3', label: 'DDR5' },
      ],
    },
    {
      key: '4',
      label: 'Tốc độ',
      children: [
        { key: '4-1', label: '2400MHz' },
        { key: '4-2', label: '2666MHz' },
        { key: '4-3', label: '3000MHz' },
        { key: '4-4', label: '3200MHz' },
        { key: '4-5', label: '3600MHz' },
        { key: '4-6', label: '4000MHz' },
      ],
    },
    {
      key: '5',
      label: 'Giá tiền',
      children: [
        { key: '5-1', label: 'Dưới 500 nghìn' },
        { key: '5-2', label: '500 nghìn - 1 triệu' },
        { key: '5-3', label: '1 - 2 triệu' },
        { key: '5-4', label: '2 - 3 triệu' },
        { key: '5-5', label: 'Trên 3 triệu' },
      ],
    },
  ];

  const vgaItems = [
    {
      key: '1',
      label: 'Thương hiệu',
      children: [
        { key: '1-1', label: 'NVIDIA' },
        { key: '1-2', label: 'AMD' },
        { key: '1-3', label: 'Intel' },
      ],
    },
    {
      key: '2',
      label: 'Kiến trúc',
      children: [
        { key: '2-1', label: 'Ampere' },
        { key: '2-2', label: 'Ada Lovelace' },
        { key: '2-3', label: 'RDNA 2' },
        { key: '2-4', label: 'RDNA 3' },
      ],
    },
    {
      key: '3',
      label: 'CUDA Cores',
      children: [
        { key: '3-1', label: '2048' },
        { key: '3-2', label: '2560' },
        { key: '3-3', label: '3584' },
        { key: '3-4', label: '5120' },
      ],
    },
    {
      key: '4',
      label: 'RT Cores',
      children: [
        { key: '4-1', label: '30' },
        { key: '4-2', label: '40' },
        { key: '4-3', label: '60' },
      ],
    },
    {
      key: '5',
      label: 'Tensor Cores',
      children: [
        { key: '5-1', label: '120' },
        { key: '5-2', label: '160' },
        { key: '5-3', label: '220' },
      ],
    },
    {
      key: '6',
      label: 'Giá tiền',
      children: [
        { key: '6-1', label: 'Dưới 5 triệu' },
        { key: '6-2', label: '5 - 10 triệu' },
        { key: '6-3', label: '10 - 15 triệu' },
        { key: '6-4', label: 'Trên 15 triệu' },
      ],
    },
  ];

  const mainboardItems = [
    {
      key: '1',
      label: 'Thương hiệu',
      children: [
        { key: '1-1', label: 'ASUS' },
        { key: '1-2', label: 'MSI' },
        { key: '1-3', label: 'Gigabyte' },
        { key: '1-4', label: 'ASRock' },
      ],
    },
    {
      key: '2',
      label: 'Chipset',
      children: [
        { key: '2-1', label: 'B660' },
        { key: '2-2', label: 'Z690' },
        { key: '2-3', label: 'B760' },
        { key: '2-4', label: 'X670' },
        { key: '2-5', label: 'A520' },
      ],
    },
    {
      key: '3',
      label: 'Âm thanh (Audio)',
      children: [
        { key: '3-1', label: 'Realtek ALC897' },
        { key: '3-2', label: 'Realtek ALC1200' },
        { key: '3-3', label: 'Realtek S1220A' },
      ],
    },
    {
      key: '4',
      label: 'Đồ họa tích hợp',
      children: [
        { key: '4-1', label: 'Có' },
        { key: '4-2', label: 'Không' },
      ],
    },
    {
      key: '5',
      label: 'LAN',
      children: [
        { key: '5-1', label: '1Gb LAN' },
        { key: '5-2', label: '2.5Gb LAN' },
      ],
    },
    {
      key: '6',
      label: 'Hỗ trợ RAM',
      children: [
        { key: '6-1', label: 'DDR4' },
        { key: '6-2', label: 'DDR5' },
      ],
    },
    {
      key: '7',
      label: 'Giá tiền',
      children: [
        { key: '7-1', label: 'Dưới 2 triệu' },
        { key: '7-2', label: '2 - 4 triệu' },
        { key: '7-3', label: '4 - 6 triệu' },
        { key: '7-4', label: 'Trên 6 triệu' },
      ],
    },
  ];
  const ssdItems = [
    {
      key: '1',
      label: 'Thương hiệu',
      children: [
        { key: '1-1', label: 'Samsung' },
        { key: '1-2', label: 'WD' },
        { key: '1-3', label: 'Kingston' },
        { key: '1-4', label: 'ADATA' },
        { key: '1-5', label: 'Crucial' },
      ],
    },
    {
      key: '2',
      label: 'Dung lượng',
      children: [
        { key: '2-1', label: '120GB' },
        { key: '2-2', label: '240GB' },
        { key: '2-3', label: '512GB' },
        { key: '2-4', label: '1TB' },
        { key: '2-5', label: '2TB' },
      ],
    },
    {
      key: '3',
      label: 'Tốc độ đọc',
      children: [
        { key: '3-1', label: '500MB/s' },
        { key: '3-2', label: '1000MB/s' },
        { key: '3-3', label: '2000MB/s' },
        { key: '3-4', label: '3500MB/s' },
      ],
    },
    {
      key: '4',
      label: 'Tốc độ ghi',
      children: [
        { key: '4-1', label: '450MB/s' },
        { key: '4-2', label: '1000MB/s' },
        { key: '4-3', label: '2000MB/s' },
        { key: '4-4', label: '3000MB/s' },
      ],
    },
    {
      key: '5',
      label: 'Giá tiền',
      children: [
        { key: '5-1', label: 'Dưới 500 nghìn' },
        { key: '5-2', label: '500 nghìn - 1 triệu' },
        { key: '5-3', label: '1 - 2 triệu' },
        { key: '5-4', label: '2 - 3 triệu' },
        { key: '5-5', label: 'Trên 3 triệu' },
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
  {
    key: '5',
    label: 'CPU',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" fill="none"><path fill="currentcolor" d="M4 1a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4Zm-.3-1h12.6c.477 0 .935.184 1.273.513.337.328.527.773.527 1.237v7c0 .464-.19.91-.527 1.237a1.826 1.826 0 0 1-1.273.513H3.7c-.477 0-.935-.184-1.273-.513A1.726 1.726 0 0 1 1.9 8.75v-7c0-.464.19-.91.527-1.237A1.826 1.826 0 0 1 3.7 0Z"/><path stroke="currentcolor" stroke-linecap="round" d="M1 12h18"/></svg>',
  },
  {
    key: '6',
    label: 'RAM',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" fill="none"><path fill="currentcolor" d="M4 1a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4Zm-.3-1h12.6c.477 0 .935.184 1.273.513.337.328.527.773.527 1.237v7c0 .464-.19.91-.527 1.237a1.826 1.826 0 0 1-1.273.513H3.7c-.477 0-.935-.184-1.273-.513A1.726 1.726 0 0 1 1.9 8.75v-7c0-.464.19-.91.527-1.237A1.826 1.826 0 0 1 3.7 0Z"/><path stroke="currentcolor" stroke-linecap="round" d="M1 12h18"/></svg>',
  },
  {
    key: '7',
    label: 'VGA',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" fill="none"><path fill="currentcolor" d="M4 1a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4Zm-.3-1h12.6c.477 0 .935.184 1.273.513.337.328.527.773.527 1.237v7c0 .464-.19.91-.527 1.237a1.826 1.826 0 0 1-1.273.513H3.7c-.477 0-.935-.184-1.273-.513A1.726 1.726 0 0 1 1.9 8.75v-7c0-.464.19-.91.527-1.237A1.826 1.826 0 0 1 3.7 0Z"/><path stroke="currentcolor" stroke-linecap="round" d="M1 12h18"/></svg>',
  },
  {
    key: '8',
    label: 'Mainboard',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" fill="none"><path fill="currentcolor" d="M4 1a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4Zm-.3-1h12.6c.477 0 .935.184 1.273.513.337.328.527.773.527 1.237v7c0 .464-.19.91-.527 1.237a1.826 1.826 0 0 1-1.273.513H3.7c-.477 0-.935-.184-1.273-.513A1.726 1.726 0 0 1 1.9 8.75v-7c0-.464.19-.91.527-1.237A1.826 1.826 0 0 1 3.7 0Z"/><path stroke="currentcolor" stroke-linecap="round" d="M1 12h18"/></svg>',
  },
  {
    key: '9',
    label: 'SSD',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" fill="none"><path fill="currentcolor" d="M4 1a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4Zm-.3-1h12.6c.477 0 .935.184 1.273.513.337.328.527.773.527 1.237v7c0 .464-.19.91-.527 1.237a1.826 1.826 0 0 1-1.273.513H3.7c-.477 0-.935-.184-1.273-.513A1.726 1.726 0 0 1 1.9 8.75v-7c0-.464.19-.91.527-1.237A1.826 1.826 0 0 1 3.7 0Z"/><path stroke="currentcolor" stroke-linecap="round" d="M1 12h18"/></svg>',
  }
];

const itemsMap = {
  Laptop: laptopItems,
  'Chuột + Lót chuột': mouseItems,
  'Tai nghe': headphoneItems,
  'Màn hình': monitorFilterItems,
  CPU: cpuItems,
  RAM: ramItems,
  VGA: vgaItems,
  Mainboard: mainboardItems,
  SSD: ssdItems,
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

    if (group === "Giá bán") {
        let query = "";
        if (value === "Dưới 15 triệu") {
          query = "max=15000000";
        } else if (value === "Từ 15 đến 20 triệu") {
          query = "min=15000000&max=20000000";
        } else if (value === "Trên 20 triệu") {
          query = "min=20000000";
        }
        navigate(`/collection/laptop?${query}`);
        return;
      }

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

  const handleMouseFilter = (group, value) => {
    const paramMap = {
      "Thương hiệu chuột": "brand",
      "Kết nối chuột": "connectivity_type",
      "DPI": "dpi",
      "Màu chuột": "color",
    };

    if (group === "Chuột theo giá tiền") {
      let query = "";
      if (value === "Dưới 500 nghìn") {
        query = "max=500000";
      } else if (value === "Từ 500 nghìn - 1 triệu") {
        query = "min=500000&max=1000000";
      } else if (value === "Từ 1 triệu - 2 triệu") {
        query = "min=1000000&max=2000000";
      } else if (value === "Trên 2 triệu - 3 triệu") {
        query = "min=2000000&max=3000000";
      } else if (value === "Trên 3 triệu") {
        query = "min=3000000";
      }
      navigate(`/collection/mouse?${query}`);
      return;
    }

    const key = paramMap[group];
    if (!key) return;
    const query = `${key}=${encodeURIComponent(value)}`;
    navigate(`/collection/mouse?${query}`);
  };

  const handleMousepadFilter = (group, value) => {
    const paramMap = {
      "Thương hiệu lót chuột": "brand",
      "Chất liệu lót chuột": "material",
      "Kích thước lót chuột": "size",
      "Màu chuột": "color",
    };

    const key = paramMap[group];
    if (!key) return;
    const query = `${key}=${encodeURIComponent(value)}`;
    navigate(`/collection/mousepad?${query}`);
  };

  const handleHeadphoneFilter = (group, value) => {
    const paramMap = {
      "Thương hiệu": "brand",
      "Kết nối": "connectivity_type",
    };

    if (group === "Giá tiền") {
      let query = "";
      if (value === "Dưới 1 triệu") {
        query = "max=1000000";
      } else if (value === "1 triệu - 2 triệu") {
        query = "min=1000000&max=2000000";
      } else if (value === "2 triệu - 3 triệu") {
        query = "min=2000000&max=3000000";
      } else if (value === "3 triệu - 4 triệu") {
        query = "min=3000000&max=4000000";
      } else if (value === "Trên 4 triệu") {
        query = "min=4000000";
      }
      navigate(`/collection/headphone?${query}`);
      return;
    }

    const key = paramMap[group];
    if (!key) return;

    const query = `${key}=${encodeURIComponent(value)}`;
    navigate(`/collection/headphone?${query}`);
  };

  const handleRamFilter = (group, value) => {
    const paramMap = {
      'Thương hiệu': 'brand',
      'Dung lượng': 'capacity',
      'Loại RAM': 'type',
      'Tốc độ': 'speed',
    };

    if (group === 'Giá tiền') {
      let query = '';
      if (value === 'Dưới 500 nghìn') query = 'max=500000';
      else if (value === '500 nghìn - 1 triệu') query = 'min=500000&max=1000000';
      else if (value === '1 - 2 triệu') query = 'min=1000000&max=2000000';
      else if (value === '2 - 3 triệu') query = 'min=2000000&max=3000000';
      else if (value === 'Trên 3 triệu') query = 'min=3000000';
      navigate(`/collection/ram?${query}`);
      return;
    }

    const key = paramMap[group];
    if (!key) return;

    const query = `${key}=${encodeURIComponent(value)}`;
    navigate(`/collection/ram?${query}`);
  };


  const handleCpuFilter = (group, value) => {
    const paramMap = {
      'Thương hiệu': 'brand',
      'Loại CPU': 'cpu_type',
      'Socket': 'socket',
      'Threads': 'threads',
      'Multiplier': 'multiplier',
    };
    if (group === 'Giá tiền') {
      let query = '';
      if (value === 'Dưới 3 triệu') query = 'max=3000000';
      else if (value === '3 - 5 triệu') query = 'min=3000000&max=5000000';
      else if (value === '5 - 8 triệu') query = 'min=5000000&max=8000000';
      else if (value === 'Trên 8 triệu') query = 'min=8000000';
      navigate(`/collection/cpu?${query}`);
      return;
    }

    const key = paramMap[group];
    if (!key) return;

    const query = `${key}=${encodeURIComponent(value)}`;
    navigate(`/collection/cpu?${query}`);
  };

  const handleVgaFilter = (group, value) => {
    const paramMap = {
        'Thương hiệu': 'brand',
        'Kiến trúc': 'architecture',
        'CUDA Cores': 'cuda_cores',
        'RT Cores': 'rt_cores',
        'Tensor Cores': 'tensor_cores',
    };

    const key = paramMap[group];
    if (!key) return;

    const query = `${key}=${encodeURIComponent(value)}`;
    navigate(`/collection/vga?${query}`);
  };

  const handleMainboardFilter = (group, value) => {
    const paramMap = {
      'Thương hiệu': 'brand',
      'Chipset': 'chipset',
      'Âm thanh (Audio)': 'audio',
      'Đồ họa tích hợp': 'integrated_graphics',
      'LAN': 'lan',
      'Hỗ trợ RAM': 'memory',
    };

    if (group === 'Giá tiền') {
      let query = '';
      if (value === 'Dưới 2 triệu') query = 'max=2000000';
      else if (value === '2 - 4 triệu') query = 'min=2000000&max=4000000';
      else if (value === '4 - 6 triệu') query = 'min=4000000&max=6000000';
      else if (value === 'Trên 6 triệu') query = 'min=6000000';
      navigate(`/collection/mainboard?${query}`);
      return;
    }

    const key = paramMap[group];
    if (!key) return;

    const query = `${key}=${encodeURIComponent(value)}`;
    navigate(`/collection/mainboard?${query}`);
  };

  const handleSsdFilter = (group, value) => {
    const paramMap = {
      'Thương hiệu': 'brand',
      'Dung lượng': 'capacity',
      'Tốc độ đọc': 'read_speed',
      'Tốc độ ghi': 'write_speed',
    };

    if (group === 'Giá tiền') {
      let query = '';
      if (value === 'Dưới 500 nghìn') query = 'max=500000';
      else if (value === '500 nghìn - 1 triệu') query = 'min=500000&max=1000000';
      else if (value === '1 - 2 triệu') query = 'min=1000000&max=2000000';
      else if (value === '2 - 3 triệu') query = 'min=2000000&max=3000000';
      else if (value === 'Trên 3 triệu') query = 'min=3000000';
      navigate(`/collection/ssd?${query}`);
      return;
    }

    const key = paramMap[group];
    if (!key) return;

    const query = `${key}=${encodeURIComponent(value)}`;
    navigate(`/collection/ssd?${query}`);
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
                            } else if (hoveredButton === "Chuột + Lót chuột") {
                              const chuot = [
                                "Thương hiệu chuột", "Kết nối chuột", "DPI", "Chuột theo giá tiền", "Màu chuột"
                              ];
                              const lot = [
                                "Thương hiệu lót chuột", "Chất liệu lót chuột", "Kích thước lót chuột"
                              ];

                              if (chuot.includes(topLevelItem.label)) {
                                handleMouseFilter(topLevelItem.label, secondLevelItem.label);
                              } else if (lot.includes(topLevelItem.label)) {
                                handleMousepadFilter(topLevelItem.label, secondLevelItem.label);
                              }
                            } else if (hoveredButton === "Tai nghe") {
                              handleHeadphoneFilter(topLevelItem.label, secondLevelItem.label);
                            } else if (hoveredButton === "CPU") {
                              handleCpuFilter(topLevelItem.label, secondLevelItem.label);
                            } else if (hoveredButton === "RAM") {
                              handleRamFilter(topLevelItem.label, secondLevelItem.label);
                            } else if (hoveredButton === "VGA") {
                              handleVgaFilter(topLevelItem.label, secondLevelItem.label);
                            } else if (hoveredButton === "Mainboard") {
                              handleMainboardFilter(topLevelItem.label, secondLevelItem.label);
                            } else if (hoveredButton === "SSD") {
                              handleSsdFilter(topLevelItem.label, secondLevelItem.label);
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