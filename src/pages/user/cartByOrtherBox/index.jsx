import React, { useEffect, useState } from 'react';
import {  Button, InputNumber, Image, Typography, Radio } from 'antd';
import CartService from '../../../service/UserService/CartService';
import VnpayService from '../../../service/UserService/Payment/VnpayService';
import AuthContext from '../../../context/AuthContext';
import { useContext } from 'react';
import './CartByOrderBox.css';
import Stepper from './Stepper';
import { DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;
import { Form, Input } from "antd";
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const CartByOrderBox = () => {
    const { user_id } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    // const [totalPrice, setTotalPrice] = useState(0);
    const [buyerInfo, setBuyerInfo] = useState({
        name: "",
        phone: "",
        address: "",
        email: ""
      });
      const [deliveryType, setDeliveryType] = useState("home");
      const [paymentMethod, setPaymentMethod] = useState("bank");
      const location = useLocation();


        const totalPrice = cartItems.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        );


      const fetchCart = async (uid) => {
        try {
          const res = await CartService.getCartDetail(uid);
          if (res && res.length > 0) {
            setCartItems(res[0].cart);
          } else {
            setCartItems([]);
          }
        } catch (error) {
          console.error('Lỗi lấy giỏ hàng:', error);
        }
      };

      const handleUpdateQuantity = async (product_id, newQuantity) => {
        try {
          await CartService.updateCart(user_id, { product_id, quantity: newQuantity });
          const res = await CartService.getCartDetail(user_id);
          setCartItems(res[0].cart);
          window.dispatchEvent(new Event("cart_updated"));
        } catch (err) {
          console.error(err);
        }
      };

      const handleDeleteItem = async (product_id) => {
        try {
          await CartService.deleteCart(user_id, product_id);
          const res = await CartService.getCartDetail(user_id);
          setCartItems(res[0].cart);
          window.dispatchEvent(new Event("cart_updated"));
        } catch (err) {
          console.error(err);
        }
      };

      const handleConfirm = async () => {
        if (paymentMethod === "bank") {
          try {
            const orderData = {
                status: "confirmed",
                total_amount: totalPrice,
                address: buyerInfo.address,
                email: buyerInfo.email,
                phone: buyerInfo.phone,
                name: buyerInfo.name,
                payment_method: paymentMethod,
                receiving_method: deliveryType,
                payment_status: "Đã thanh toán",
                user_id: user_id,
                order_items: cartItems.map(item => ({
                  product_id: item.product_id,
                  quantity: item.quantity,
                  price: item.price
                }))
            };
                localStorage.setItem("pendingOrder", JSON.stringify(orderData));
            const result = await VnpayService.payment({
              amount: totalPrice,
              order_desc: buyerInfo.email
            });
            window.open(result.payment_url, "_self");

          } catch (err) {
            console.error(err);
          }
        } else {
            try {
                const orderData = {
                    status: "Pending",
                    total_amount: totalPrice,
                    address: buyerInfo.address,
                    phone: buyerInfo.phone,
                    name: buyerInfo.name,
                    payment_method: paymentMethod,
                    receiving_method: deliveryType,
                    payment_status: "Chưa thanh toán",
                    user_id: user_id,
                    order_items: cartItems.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price
                    }))
                };
                if (orderData) {
                   try {
                     CartService.createOrder(orderData);
                     Swal.fire({
                        icon: 'success',
                        title: 'Đặt hàng thành công!',
                        showConfirmButton: false,
                        timer: 3000
                        })
                   } catch (error) {
                     Swal.fire({
                        icon: 'error',
                        title: 'Đặt hàng thất bại!',
                        showConfirmButton: false,
                        timer: 3000
                        })
                   }
                }
          } catch (err) {
            console.error(err);
          }
        }
      };

      useEffect(() => {
        const params = new URLSearchParams(location.search);
        const responseCode = params.get("vnp_ResponseCode");

        if (responseCode === "00") {
            Swal.fire({
                icon: 'success',
                title: 'Thanh toán thành công!',
                showConfirmButton: false,
                timer: 3000
          }).then(() => {

            const orderData = JSON.parse(localStorage.getItem("pendingOrder"));
                if (orderData) {
                    CartService.createOrder(orderData);
                    localStorage.removeItem("pendingOrder");
                }
          })
          window.history.replaceState(null, "", "/cart");
        } else if (responseCode) {
          Swal.fire({
            icon: 'error',
            title: 'Thanh toán thất bại hoặc bị hủy!',
            showConfirmButton: false,
            timer: 3000
          }).then(() => {
            localStorage.removeItem("pendingOrder");
            window.history.replaceState(null, "", "/cart");
          })
        }
      }, [location.search]);


    useEffect(() => {
      if (user_id) fetchCart(user_id);
    }, [user_id]);


    const next = () => {
        if (currentStep === 0 && cartItems.length === 0) {
          message.warning("Giỏ hàng trống, không thể đặt hàng!");
          return;
        }
        setCurrentStep(currentStep + 1);
      };
  const prev = () => setCurrentStep(currentStep - 1);

  const steps = [
    {
        title: 'Giỏ hàng',
        content: (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="right-cart">
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div className="cart-item-img">
                            <Image width={100} src={item.url_img} alt={item.name_prodcut} />
                        </div>
                            <Button
                                onClick={() => handleDeleteItem(item.product_id)}
                                icon={<DeleteOutlined />}
                                type="text"
                                size="middle"
                                style={{
                                    color: "#535353",
                                    background: "#fff",
                                    boxShadow: "none",
                                    fontWeight: 400,
                                    border: "none",
                                    margin: 0,
                                    padding: "4px 12px",
                                }}
                                >
                                Xóa
                            </Button>
                        </div>

                    <span className="cart-item-name">{item.name_prodcut}</span>
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-header">
                    <span className="cart-item-price">
                      {item.price.toLocaleString('vi-VN')}<span className="vnd">₫</span>
                    </span>
                  </div>
                  {item.original_price && (
                    <div className="cart-item-original-price">
                      {item.original_price.toLocaleString('vi-VN')}₫
                    </div>
                  )}
                  {item.gifts && item.gifts.length > 0 && (
                    <div className="cart-item-gift">
                      <div className="gift-title">Quà tặng khuyến mãi</div>
                      <ul>
                        {item.gifts.map((gift, idx) => (
                          <li key={idx}>{gift}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="cart-item-actions">
                  <div
                    className="cart-item-quantity"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #e0e0e0",
                        borderRadius: 6,
                        overflow: "hidden",
                        width: 110,
                        height: 27,
                        background: "#fff"
                    }}
                    >
                    <Button
                        style={{
                        width: 36,
                        height: 32,
                        border: "none",
                        borderRight: "1px solid #e0e0e0",
                        borderRadius: 0,
                        background: "transparent",
                        color: "#bdbdbd"
                        }}
                        disabled={item.quantity === 1}
                        onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)}
                    >
                        -
                    </Button>
                    <InputNumber
                        style={{
                        width: 38,
                        height: 32,
                        border: "none",
                        textAlign: "center",
                        borderRadius: 0,
                        background: "transparent"
                        }}
                        min={1}
                        value={item.quantity}
                        readOnly
                    />
                    <Button
                        style={{
                        width: 36,
                        height: 32,
                        border: "none",
                        borderLeft: "1px solid #e0e0e0",
                        borderRadius: 0,
                        background: "transparent"
                        }}
                        onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                    >
                        +
                    </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{fontSize: 18, fontWeight: 500}}>Tổng tiền:</div>
                <Title style={{ fontSize: 18, fontWeight: 500 }}>
                    {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('vi-VN')}₫
                </Title>
            </div>
            <div style={{ textAlign: 'center'}}>
              <Button
                style={{width: '100%', height: 40, borderRadius: 6, padding: 25}}
                type="primary"
                size="middle"
                danger
                onClick={() => {
                  if (cartItems.length === 0) {
                    message.warning("Giỏ hàng trống, không thể đặt hàng!");
                    return;
                  }
                  next();
                }}
                disabled={cartItems.length === 0}
              >
                ĐẶT HÀNG NGAY
              </Button>
            </div>
          </div>
        ),
    },
    {
    title: 'Thông tin đặt hàng',
    content: (
        <Form
        className="buyer-info-form"
        layout="vertical"
        style={{ maxWidth: 400, margin: "0 auto" }}
        initialValues={buyerInfo}
        onValuesChange={(changed, all) => setBuyerInfo(all)}
        onFinish={() => next()}
        >
        <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
            <Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            { pattern: /^[0-9]{9,11}$/, message: "Số điện thoại không hợp lệ" }
            ]}
        >
            <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
        >
            <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
            <Input placeholder="Nhập địa chỉ nhận hàng" />
        </Form.Item>
        <Form.Item
                label="Hình thức nhận hàng"
                name="deliveryType"
                initialValue="home"
                rules={[{ required: true, message: "Vui lòng chọn hình thức nhận hàng" }]}
            >
            <Radio.Group
            onChange={e => setDeliveryType(e.target.value)}
            value={deliveryType}
            style={{ display: "flex", gap: 24 }}
            >
                <Radio value="home">Giao hàng tại nhà</Radio>
                <Radio value="store">Nhận tại cửa hàng</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Tiếp tục
            </Button>
        </Form.Item>
        </Form>
    ),
    },
    {
    title: 'Thanh toán',
    content: (
        <Form
        layout="vertical"
        style={{ maxWidth: 400, margin: "0 auto" }}
        initialValues={{ paymentMethod: "bank" }}
        onFinish={() => next()}
        >
        <Form.Item
            label="Chọn phương thức thanh toán"
            name="paymentMethod"
            rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán" }]}
        >
            <Radio.Group
            onChange={e => setPaymentMethod(e.target.value)}
            value={paymentMethod}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
            <Radio value="bank">Chuyển khoản</Radio>
            <Radio value="cod">Nhận hàng thanh toán</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%", marginTop: 20 }}>
            Tiếp tục
            </Button>
        </Form.Item>
        </Form>
    ),
    },
    {
    title: 'Hoàn tất',
    content: (
        <div style={{ maxWidth: 400, margin: "0 auto", background: "#fff", borderRadius: 10, padding: 24 }}>
        <h3 style={{ color: "#e30019", marginBottom: 16 }}>Xác nhận thông tin đơn hàng</h3>
        <div style={{ marginBottom: 12 }}>
            <b>Họ và tên:</b> {buyerInfo.name}
        </div>
        <div style={{ marginBottom: 12 }}>
            <b>Số điện thoại:</b> {buyerInfo.phone}
        </div>
        <div style={{ marginBottom: 12 }}>
            <b>Hình thức nhận hàng:</b> {buyerInfo.deliveryType === "home" ? "Giao hàng tại nhà" : "Nhận tại cửa hàng"}
        </div>
        {buyerInfo.deliveryType === "home" && (
            <div style={{ marginBottom: 12 }}>
            <b>Địa chỉ:</b> {buyerInfo.address}
            </div>
        )}
        <div style={{ marginBottom: 12 }}>
            <b>Phương thức thanh toán:</b> {paymentMethod === "bank" ? "Chuyển khoản" : "Nhận hàng thanh toán"}
        </div>
        <Button type="primary" size="large" style={{ width: "100%", marginTop: 16 }} onClick={handleConfirm}>
            Xác nhận
        </Button>
        </div>
    ),
    }
  ];

  return (
    <div className='container-fluid' style={{  minHeight: '100vh' }}>
      <div className='cart-container'>
        <Stepper currentStep={currentStep} />
        <div className="steps-content">{steps[currentStep].content}</div>
        <div className="steps-action">
          {currentStep > 0 && (
            <Button style={{ marginTop: 20 }} onClick={prev}>
              Quay lại
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartByOrderBox;
