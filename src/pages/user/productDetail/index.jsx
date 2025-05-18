import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductService from '../../../service/UserService/ProductService';
import { Card } from 'antd';
import "./ProductDetail.css";
import AuthContext from '../../../context/AuthContext';
import CartService from '../../../service/UserService/CartService';

const formatVND = (value) => {
  if (!value) return '';
  const number = Number(value);
  if (isNaN(number)) return value;
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const ProductDetail = () => {
  const { id } = useParams();
  const { user_id } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductService.getProductById(id),
    enabled: !!id,
  });

  if (isLoading) return <div className='container-fluid'>Đang tải...</div>;
  if (isError || !product) return <div className='container-fluid'>Lỗi hoặc không tìm thấy sản phẩm</div>;

  const mainImage = selectedImage || product.url_img;

  const handleBuyNow = async () => {
    if (!user_id) return;
    try {
        await CartService.addToCart(id, 1, user_id);
        window.dispatchEvent(new CustomEvent("cart_updated"));
    } catch (err) {
        console.error(err);
    }
};

  return (
    <div className="container-fluid">
      <div className="product-detail-container">
        <div className="product-detail-wrapper">
          <div className="product-images">
            <div className="main-image-container">
              <img
                src={mainImage}
                alt={product.name}
                className="main-image"
              />
            </div>
            <div className="thumbnail-gallery">
              {(product.imgs || [product.url_img]).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            {product.brand && (
                <div className="product-brand" style={{color: "#000000", fontSize: "16px"}}>
                <strong>Thương hiệu:</strong> {product.brand}
            </div>
            )}

            <div className="product-rating">
              <span className="rating-stars">{product.rating} ★</span>
              <span className="review-count">{product.reviews} 3 đánh giá</span>
            </div>

            <div className="product-price-container">
              <span className="current-price">{formatVND(product.price)}</span>
              {product.originalPrice && (
                <span className="original-price">{formatVND(product.originalPrice)}</span>
              )}
              {product.discount && (
                <span className="discount-badge">{product.discount}</span>
              )}
            </div>

            <div className="promotion-box">
              <div className="promotion-title">🎁 Quà tặng khuyến mãi</div>
              <ul className="promotion-list">
                {(product.gifts || []).map((gift, idx) => (
                  <li key={idx} className="promotion-item">{gift}</li>
                ))}
              </ul>
            </div>

            <div className="buy-button-container" style={{display: "flex", justifyContent: "center", alignItems: "center"}} onClick={handleBuyNow}>
                <button className="buy-button" style={{width: "60%"}} >
                    MUA NGAY
                    <div className="delivery-info">Giao tận nơi hoặc nhận tại cửa hàng</div>
                </button>
            </div>
            <Card className="specs-card">
              <h3 className="specs-title">Thông số kỹ thuật</h3>
              <ul className="specs-list">
                {product.config_product && typeof product.config_product === 'object' ? (
                  Object.entries(product.config_product).map(([key, value]) => (
                    <li key={key} className="spec-item">
                      <strong>{key.toUpperCase()}:</strong> {value}
                    </li>
                  ))
                ) : (
                  <li>Không có thông số kỹ thuật</li>
                )}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
