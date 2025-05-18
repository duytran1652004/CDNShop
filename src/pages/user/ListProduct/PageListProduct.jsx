import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Row, Col, Empty, Spin } from "antd";
import ProductService from "../../../service/UserService/ProductService";
import ProductCard from "../../../components/ProductCard/ProductCard";

const PageListProduct = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      let result = [];

      if (category === "laptop") {
        const brand = searchParams.get("brand");
        const cpu = searchParams.get("cpu");
        const ram = searchParams.get("ram");
        const storage = searchParams.get("storage");
        const screen = searchParams.get("screen");

        result = await ProductService.getLaptopByFilter({
          brand,
          cpu,
          ram,
          storage,
          screen,
        });
      }

      if (category === "screen") {
        const screen_type = searchParams.get("screen_type");
        const screen_size = searchParams.get("screen_size");
        const resolution = searchParams.get("resolution");
        const refresh_rate = searchParams.get("refresh_rate");
        const aspect_ratio = searchParams.get("aspect_ratio");

        result = await ProductService.getScreenByFilter({
          screen_type,
          screen_size,
          resolution,
          refresh_rate,
          aspect_ratio,
        });
      }

      setProducts(result);
    } catch (error) {
      console.error("Lỗi lấy sản phẩm:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, searchParams]);

  return (
    <div className="container-fluid" style={{ padding: 24 }}>
      {loading ? (
        <Spin size="large" />
      ) : products.length === 0 ? (
        <Empty description="Không có sản phẩm nào." />
      ) : (
        <div className="row" style={{padding:10, backgroundColor: "#fff"}}>
            <Row gutter={[16, 16]}>
                {products.map((item) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={6} key={item.product_id}>
                    <ProductCard
                        product_id={item.product_id}
                        url_img={item.url_img}
                        name={item.name}
                        price={item.price}
                        config_product={item}
                        isDetail={true}
                    />
                    </Col>
                ))}
            </Row>
        </div>
      )}
    </div>
  );
};

export default PageListProduct;
