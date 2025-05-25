import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Row, Col, Empty, Spin } from "antd";
import ProductService from "../../../service/UserService/ProductService";
import ProductCard from "../../../components/ProductCard/ProductCard";
import "./PageListProduct.css";

const PageListProduct = () => {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    let categoryFE = "";
    if (category === "laptop") categoryFE = "Laptop";
    if (category === "mouse") categoryFE = "Mice";
    if (category === "mousepad") categoryFE = "Mousepad";
    if (category === "screen") categoryFE = "Screen";
    if (category === "vga") categoryFE = "VGA";
    if (category === "headphone") categoryFE = "HeadPhone";
    if (category === "cpu") categoryFE = "CPU";
    if (category === "ram") categoryFE = "RAM";
    if (category === "ssd") categoryFE = "SSD";
    if (category === "mainboard") categoryFE = "Mainboard";
    if (category === "ssd") categoryFE = "SSD";

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
            const min = searchParams.get("min");
            const max = searchParams.get("max");

            result = await ProductService.getLaptopByFilter({
                brand,
                cpu,
                ram,
                storage,
                screen,
                min,
                max,
            });
        }
        if (category === "screen") {
            const screen_type = searchParams.get("screen_type");
            const screen_size = searchParams.get("screen_size");
            const resolution = searchParams.get("resolution");
            const refresh_rate = searchParams.get("refresh_rate");
            const aspect_ratio = searchParams.get("aspect_ratio");
            const min = searchParams.get("min");
            const max = searchParams.get("max");

            result = await ProductService.getScreenByFilter({
                screen_type,
                screen_size,
                resolution,
                refresh_rate,
                aspect_ratio,
                min,
                max,
            });
        }
        if (category === "mouse") {
            const brand = searchParams.get("brand");
            const color = searchParams.get("color");
            const connectivity_type = searchParams.get("connectivity_type");
            const dpi = searchParams.get("dpi");
            const min = searchParams.get("min");
            const max = searchParams.get("max");

            result = await ProductService.getMouseByFilter({
                brand, color, connectivity_type, dpi, min, max
            });
        }
        if (category === "mousepad") {
            const brand = searchParams.get("brand");
            const color = searchParams.get("color");
            const material = searchParams.get("material");
            const size = searchParams.get("size");
            const min = searchParams.get("min");
            const max = searchParams.get("max");

            result = await ProductService.getMousepadByFilter({
                brand, color, material, size, min, max
            });
        }
        if (category === "headphone") {
            const brand = searchParams.get("brand");
            const connectivity_type = searchParams.get("connectivity_type");
            const min = searchParams.get("min");
            const max = searchParams.get("max");

            result = await ProductService.getHeadphoneByFilter({
                brand, connectivity_type, min, max
            });
        }
        if (category === "cpu") {
            const brand = searchParams.get("brand");
            const cpu_type = searchParams.get("cpu_type");
            const socket = searchParams.get("socket");
            const threads = searchParams.get("threads");
            const multiplier = searchParams.get("multiplier");
            const min = searchParams.get("min");
            const max = searchParams.get("max");

            result = await ProductService.getCpuByFilter({
                brand, cpu_type, socket, threads, multiplier, min, max
            });
        }
        if (category === "ram") {
            const brand = searchParams.get("brand");
            const capacity = searchParams.get("capacity");
            const type = searchParams.get("type");
            const speed = searchParams.get("speed");
            const min = searchParams.get("min");
            const max = searchParams.get("max");

            result = await ProductService.getRamByFilter({
                brand, capacity, type, speed, min, max
            });
        }
        if (category === "vga") {
            const brand = searchParams.get("brand");
            const architecture = searchParams.get("architecture");
            const cuda_cores = searchParams.get("cuda_cores");
            const rt_cores = searchParams.get("rt_cores");
            const tensor_cores = searchParams.get("tensor_cores");
            const min = searchParams.get("min");
            const max = searchParams.get("max");

            result = await ProductService.getVgaByFilter({
                brand, architecture, cuda_cores, rt_cores, tensor_cores, min, max
            });
        }
        if (category === "mainboard") {
            const brand = searchParams.get("brand");
            const chipset = searchParams.get("chipset");
            const audio = searchParams.get("audio");
            const integrated_graphics = searchParams.get("integrated_graphics");
            const lan = searchParams.get("lan");
            const memory = searchParams.get("memory");
            const min = searchParams.get("min");
            const max = searchParams.get("max");

            result = await ProductService.getMainByFilter({
                brand, chipset, audio, integrated_graphics, lan, memory, min, max
            });
        }
        if (category === "ssd") {
            const brand = searchParams.get("brand");
            const capacity = searchParams.get("capacity");
            const read_speed = searchParams.get("read_speed");
            const write_speed = searchParams.get("write_speed");
            const min = searchParams.get("min");
            const max = searchParams.get("max");

            result = await ProductService.getSsdByFilter({
                brand, capacity, read_speed, write_speed, min, max
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
             <div className="grid-5-col">
                {products.map((item) => (
                    <div className="grid-item" key={item.product_id}>
                        <ProductCard
                            product_id={item.product_id}
                            url_img={item.url_img}
                            name={item.name}
                            price={item.price}
                            config_product={item.config_product}
                            isDetail={true}
                            category={categoryFE}
                        />
                    </div>
                ))}
                </div>
            </Row>
        </div>
      )}
    </div>
  );
};

export default PageListProduct;
