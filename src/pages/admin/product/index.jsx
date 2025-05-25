import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductService from "../../../service/AdminService/ProductService";
import LaptopService from "../../../service/AdminService/LaptopService";
import { Button, Input, message, Modal, Form, Select, Popconfirm, Space, Typography, Table } from "antd";
import LaptopModal from "../laptop/LaptopModal";
const { Option } = Select;
const { Text } = Typography;

import TableDataGrid from "../../../components/TableDataGrid";


import ScreenModal from "../screen/ScreenModal";
import ScreenService from "../../../service/AdminService/ScreenService";
import MiceModal from "../mice/MiceModal";
import MiceService from "../../../service/AdminService/MiceService";
import MousepadService from "../../../service/AdminService/MousePadService";
import MousepadModal from "../mouse-pad/MousepadModal";
import HeadphoneModal from "../headphone/HeadPhoneModal";
import HeadphoneService from "../../../service/AdminService/HeaderPhoneService";

import MainModal from "../mainBoard/MainBoardModal";
import MainService from "../../../service/AdminService/MainService";

import CPUModal from "../cpu/CPUModal";
import CPUService from "../../../service/AdminService/CPUService";

import VGAModal from "../vga/VGAModal";
import VgaService from "../../../service/AdminService/VgaService";

import RAMModal from "../ram/RAMModal";
import RamService from "../../../service/AdminService/RamService";




const Product = () => {
    const queryClient = useQueryClient();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLaptopConfigModalVisible, setIsLaptopConfigModalVisible] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [form] = Form.useForm();


    const [selectedCategory, setSelectedCategory] = useState(null);
    const [laptopConfig, setLaptopConfig] = useState({ ram: "", cpu: "", storage: "", screen: "" });


    const [laptopImages, setLaptopImages] = useState([]);
    const [mouseImages, setMouseImages] = useState([]);
    const [headphoneImages, setHeadphoneImages] = useState([]);
    const [mousepadImages, setMousepadImages] = useState([]);


    const [isScreenModalVisible, setIsScreenModalVisible] = useState(false);
    const [screenConfig, setScreenConfig] = useState({
        screenType: "",
        screenSize: "",
        resolution: "",
        refreshRate: "",
        aspectRatio: "",
        touchscreen: false,
        });
    const [screenImages, setScreenImages] = useState([]);
    const [isMouseModalVisible, setIsMouseModalVisible] = useState(false);
    const [mouseConfig, setMouseConfig] = useState({
        color: "",
        connectivityType: "",
        dpi: "",
        });
    const [isMousepadModalVisible, setIsMousepadModalVisible] = useState(false);
    const [mousepadConfig, setMousepadConfig] = useState({
    material: "",
    size: ""
    });
    const [filters, setFilters] = useState({
      page: 0,
      name: "",
      brandId: null,
      categoryId: null,
      size: 10,
    });

    const [isHeadphoneModalVisible, setIsHeadphoneModalVisible] = useState(false);
    const [headphoneConfig, setHeadphoneConfig] = useState({
        batteryLife: "",
        color: "",
        connectivityType: "",
      });

    const [isMainModalVisible, setIsMainModalVisible] = useState(false);
    const [mainConfig, setMainConfig] = useState({
        chipset: "",
        memory: "",
        integratedGraphics: "",
        audio: "",
        lan: ""
      });

    const [mainImages, setMainImages] = useState([]);
    const [isCPUModalVisible, setIsCPUModalVisible] = useState(false);
    const [cpuConfig, setCpuConfig] = useState({
        cpuType: "",
        socket: "",
        threads: "",
        multiplier: ""
      });

    const [cpuImages, setCpuImages] = useState([]);

    const [isVGAModalVisible, setIsVGAModalVisible] = useState(false);
    const [vgaConfig, setVgaConfig] = useState({
        architecture: "",
        cudaCores: "",
        rtCores: "",
        tensorCores: ""
    });
    const [vgaImages, setVgaImages] = useState([]);

    const [isRAMModalVisible, setIsRAMModalVisible] = useState(false);
    const [ramConfig, setRamConfig] = useState({
    capacity: "",
    type: "",
    speed: ""
    });
    const [ramImages, setRamImages] = useState([]);




    const materialOptions = ["Vải", "Nhựa", "Nhôm", "Kính"];
    const sizeOptions = ["Small", "Medium", "Large", "XL"];

    const ramOptions = ["4GB", "8GB", "16GB", "32GB"];
    const cpuOptions = ["Intel Core i3", "Intel Core i5", "Intel Core i7", "AMD Ryzen 5", "AMD Ryzen 7", "AMD Ryzen 9"];
    const storageOptions = ["256GB SSD", "512GB SSD", "1TB SSD", "1TB HDD"];
    const screenOptions = ['13"', '14"', '15.6"', '17"'];


    const screenTypeOptions = ["IPS", "VA", "TN", "OLED"];
    const screenSizeOptions = ['21', '23.8', '24', '27', '32', '34', '49'];
    const resolutionOptions = ["1920x1080", "2560x1440", "3840x2160", "5120x1440"];
    const refreshRateOptions = ["60", "75", "120", "144", "165", "240"];
    const aspectRatioOptions = ["16:9", "21:9", "32:9", "4:3"];

    const colorOptions = ["Đen", "Trắng", "Xanh", "Đỏ", "Vàng", "Tím", "Hồng"];
    const connectivityOptions = ["USB", "Bluetooth", "USB-C", "USB-Type-C"];
    const dpiOptions = ["400", "800", "1200", "1600", "2400", "3200"];


    const batteryLifeOptions = ["10", "20", "30", "40", "50"];

    const { data: productData, isLoading: productsLoading } = useQuery({
        queryKey: ["products", filters],
        queryFn: () => ProductService.getAllProducts(filters),
    });
    console.log("productData", productData);

    const products = productData?.response || [];
    console.log("products", products);

    const paginationInfo = {
        current: productData?.info?.page || 1,
        total: productData?.info?.total || 0,
        pageSize: productData?.info?.size || 10,
    };

    const handleTableChange = (pagination) => {
        setFilters((prev) => ({
        ...prev,
        page: pagination.current,
        }));
    };

    const { data: brands } = useQuery({
        queryKey: ["brands"],
        queryFn: () => ProductService.getAllBrands(),
    });

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => ProductService.getAllCategories(),
    });

  const createProductMutation = useMutation({
    mutationFn: (data) => ProductService.createProduct(data),
    onSuccess: async (productData) => {

        if (selectedCategory?.name === "Laptop") {
          const laptopData = {
            product: { productId: productData.productId },
            ram: laptopConfig.ram,
            cpu: laptopConfig.cpu,
            storage: laptopConfig.storage,
            screen: laptopConfig.screen,
          };
          await LaptopService.createLaptop({ data: laptopData, file: laptopImages });
          setLaptopImages([]);
        }
        if (selectedCategory?.name === "Screen") {
          const screenData = {
            screenType: screenConfig.screenType,
            screenSize: screenConfig.screenSize,
            resolution: screenConfig.resolution,
            refreshRate: screenConfig.refreshRate,
            aspectRatio: screenConfig.aspectRatio,
            touchscreen: screenConfig.touchscreen,
            product: { productId: productData.productId },
          };
          await ScreenService.createScreen({ data: screenData, file: screenImages });
          setScreenImages([]);
        }
        if (selectedCategory?.name === "Mice") {
            const miceData = {
              product: { productId: productData.productId },
              color: mouseConfig.color,
              connectivityType: mouseConfig.connectivityType,
              dpi: mouseConfig.dpi,
            };
            await MiceService.createMice({ data: miceData, file: mouseImages });
            setMouseImages([]);
        }
        if (selectedCategory?.name === "MousePad") {
            const mousepadData = {
                product: { productId: productData.productId },
                material: mousepadConfig.material,
                size: mousepadConfig.size,
            };
            const files = mousepadImages
                .map(f => f.originFileObj)
                .filter(f => f instanceof File);
            await MousepadService.createMousepad({ data: mousepadData, file: files });
            setMousepadImages([]);
        }
        if (selectedCategory?.name === "HeadPhone") {
            const headphoneData = {
              product: { productId: productData.productId },
              batteryLife: headphoneConfig.batteryLife,
              color: headphoneConfig.color,
              connectivityType: headphoneConfig.connectivityType,
            };
            console.log(headphoneData);
            const files = headphoneImages
              .map((f) => f.originFileObj)
              .filter((f) => f instanceof File);
            console.log(files);
            await HeadphoneService.createHeadphone({ data: headphoneData, file: files });
            setHeadphoneImages([]);
        }
        if (selectedCategory?.name === "Main") {
            const mainData = {
              product: { productId: productData.productId },
              chipset: mainConfig.chipset,
              memory: mainConfig.memory,
              integratedGraphics: mainConfig.integratedGraphics,
              audio: mainConfig.audio,
              lan: mainConfig.lan
            };
            const files = mainImages.filter(f => f instanceof File);
            await MainService.createMain({ data: mainData, file: files });
            setMainImages([]);
        }
        if (selectedCategory?.name === "CPU") {
            const cpuData = {
              product: { productId: productData.productId },
              cpuType: cpuConfig.cpuType,
              socket: cpuConfig.socket,
              threads: cpuConfig.threads,
              multiplier: cpuConfig.multiplier
            };
            const files = cpuImages.filter(f => f instanceof File);
            await CPUService.createCPU({ data: cpuData, file: files });
            setCpuImages([]);
        }
        if (selectedCategory?.name === "VGA") {
            const vgaData = {
              product: { productId: productData.productId },
              architecture: vgaConfig.architecture,
              cudaCores: vgaConfig.cudaCores,
              rtCores: vgaConfig.rtCores,
              tensorCores: vgaConfig.tensorCores
            };
            const files = vgaImages.filter(f => f instanceof File);
            await VgaService.createVGA({ data: vgaData, file: files });
            setVgaImages([]);
        }
        if (selectedCategory?.name === "RAM") {
            const ramData = {
              product: { productId: productData.productId },
              capacity: ramConfig.capacity,
              type: ramConfig.type,
              speed: ramConfig.speed
            };
            const files = ramImages.filter(f => f instanceof File);
            await RamService.createRAM({ data: ramData, file: files });
            setRamImages([]);
          }
            queryClient.invalidateQueries(["products"]);
            setIsModalVisible(false);
            message.success("Tạo product thành công!");
      },
    onError: (error) => {
      message.error(`Tạo product thất bại: ${error.message}`);
    },
  });

    const updateProductMutation = useMutation({
    mutationFn: ({ id, data }) => ProductService.updateProduct(id, data),
    onSuccess: async (productData) => {
      const productId = productData.productId ?? editProduct?.productId;

      // ------------------- LAPTOP -------------------
      if (selectedCategory?.name === "Laptop") {
        const original = editProduct?.originalLaptop || {};
        const hasConfigChanged = (
          laptopConfig.ram !== "" ||
          laptopConfig.cpu !== "" ||
          laptopConfig.storage !== "" ||
          laptopConfig.screen !== ""
        );

        const mergedLaptopData = {
          laptopId: editProduct?.laptopId || 0,
          product: { productId },
          brand: { brandId: productData.brand?.brandId },
          ram: hasConfigChanged ? laptopConfig.ram : original.ram,
          cpu: hasConfigChanged ? laptopConfig.cpu : original.cpu,
          storage: hasConfigChanged ? laptopConfig.storage : original.storage,
          screen: hasConfigChanged ? laptopConfig.screen : original.screen,
        };



        console.log("Sending laptop update:", mergedLaptopData);

        if (editProduct?.laptopId) {
          await LaptopService.updateLaptop(editProduct.laptopId, mergedLaptopData);
        } else {
          const imageFiles = laptopImages.filter(f => f.originFileObj).map(f => f.originFileObj);
          await LaptopService.createLaptop({
            data: mergedLaptopData,
            file: imageFiles
          });
        }

        setLaptopImages([]);
      }

      // ------------------- SCREEN -------------------
      if (selectedCategory?.name === "Screen") {
        const original = editProduct?.originalScreen || {};

        const mergedScreenData = {
          screenId: editProduct?.screenId || 0,
          product: { productId },
          screenType: screenConfig.screenType || original.screenType,
          screenSize: screenConfig.screenSize || original.screenSize,
          resolution: screenConfig.resolution || original.resolution,
          refreshRate: screenConfig.refreshRate || original.refreshRate,
          aspectRatio: screenConfig.aspectRatio || original.aspectRatio,
          touchscreen: screenConfig.touchscreen !== undefined ? screenConfig.touchscreen : original.touchscreen
        };

        console.log("Sending screen update:", mergedScreenData);

        if (editProduct?.screenId) {
          await ScreenService.updateScreen(editProduct.screenId, mergedScreenData);
        } else {
          const imageFiles = screenImages.filter(f => f.originFileObj).map(f => f.originFileObj);
          await ScreenService.createScreen({
            data: mergedScreenData,
            file: imageFiles
          });
        }

        setScreenImages([]);
      }

      // ------------------- MICE -------------------
      if (selectedCategory?.name === "Mice") {
        const original = editProduct?.originalMouse || {};

        const mergedMiceData = {
          mouseId: editProduct?.miceId || 0,
          product: { productId },
          color: mouseConfig.color || original.color,
          connectivityType: mouseConfig.connectivityType || original.connectivityType,
          dpi: mouseConfig.dpi || original.dpi
        };

        console.log("Sending mice update:", mergedMiceData);

        if (editProduct?.mouseId) {
          await MiceService.updateMice(editProduct.mouseId, mergedMiceData);
        } else {
          const imageFiles = mouseImages.filter(f => f.originFileObj).map(f => f.originFileObj);
          await MiceService.createMice({
            data: mergedMiceData,
            file: imageFiles
          });
        }

        setMouseImages([]);
      }

      // ------------------- MOUSEPAD -------------------
      if (selectedCategory?.name === "MousePad") {
        const original = editProduct?.originalMousepad || {};

        const mergedMousepadData = {
          mousepadId: editProduct?.mousepadId || 0,
          product: { productId },
          material: mousepadConfig.material || original.material,
          size: mousepadConfig.size || original.size
        };

        if (editProduct?.mousepadId) {
          await MousepadService.updateMousepad(editProduct.mousepadId, mergedMousepadData);
        } else {
          const imageFiles = mousepadImages.filter(f => f.originFileObj).map(f => f.originFileObj);
          await MousepadService.createMousepad({
            data: mergedMousepadData,
            file: imageFiles
          });
        }

        setMousepadImages([]);
      }
      if (selectedCategory?.name === "HeadPhone") {
        const original = editProduct?.originalHeadphone || {};

        const mergedHeadphoneData = {
          headphoneId: editProduct?.headphoneId || 0,
          product: { productId },
          batteryLife: headphoneConfig.batteryLife || original.batteryLife,
          color: headphoneConfig.color || original.color,
          connectivityType: headphoneConfig.connectivityType || original.connectivityType,
        };

        if (editProduct?.headphoneId) {
          await HeadphoneService.updateHeadphone(editProduct.headphoneId, mergedHeadphoneData);
        } else {
          const imageFiles = headphoneImages.filter((f) => f.originFileObj).map((f) => f.originFileObj);
          await HeadphoneService.createHeadphone({
            data: mergedHeadphoneData,
            file: imageFiles,
          });
        }

        setHeadphoneImages([]);
      }
      if (selectedCategory?.name === "Main") {
        const original = editProduct?.originalMain || {};
        const mergedMainData = {
          mainId: editProduct?.mainId || 0,
          product: { productId },
          chipset: mainConfig.chipset || original.chipset,
          memory: mainConfig.memory || original.memory,
          integratedGraphics: mainConfig.integratedGraphics || original.integratedGraphics,
          audio: mainConfig.audio || original.audio,
          lan: mainConfig.lan || original.lan
        };

        if (editProduct?.mainId) {
          await MainService.updateMain(editProduct.mainId, mergedMainData);
        } else {
          const imageFiles = mainImages.filter(f => f.originFileObj).map(f => f.originFileObj);
          await MainService.createMain({ data: mergedMainData, file: imageFiles });
        }

        setMainImages([]);
      }
      if (selectedCategory?.name === "CPU") {
        const original = editProduct?.originalCPU || {};
        const mergedCPUData = {
          cpuId: editProduct?.cpuId || 0,
          product: { productId },
          socket: cpuConfig.socket || original.socket,
          cpuType: cpuConfig.cpuType || original.cpuType,
          threads: cpuConfig.threads || original.threads,
          multiplier: cpuConfig.multiplier || original.multiplier
        };

        if (editProduct?.cpuId) {
          await CPUService.updateCPU(editProduct.cpuId, mergedCPUData);
        } else {
          const imageFiles = cpuImages.filter(f => f.originFileObj).map(f => f.originFileObj);
          await CPUService.createCPU({ data: mergedCPUData, file: imageFiles });
        }

        setCpuImages([]);
      }
      if (selectedCategory?.name === "VGA") {
        const original = editProduct?.originalVGA || {};
        const mergedVGAData = {
          vgaId: editProduct?.vgaId || 0,
          product: { productId },
          architecture: vgaConfig.architecture || original.architecture,
          cudaCores: vgaConfig.cudaCores || original.cudaCores,
          rtCores: vgaConfig.rtCores || original.rtCores,
          tensorCores: vgaConfig.tensorCores || original.tensorCores
        };

        if (editProduct?.vgaId) {
          await VgaService.updateVGA(editProduct.vgaId, mergedVGAData);
        } else {
          const imageFiles = vgaImages.filter(f => f.originFileObj).map(f => f.originFileObj);
          await VgaService.createVGA({ data: mergedVGAData, file: imageFiles });
        }

        setVgaImages([]);
      }
      if (selectedCategory?.name === "RAM") {
        const original = editProduct?.originalRam || {};
        const mergedRamData = {
          ramId: editProduct?.ramId || 0,
          product: { productId },
          capacity: ramConfig.capacity || original.capacity,
          type: ramConfig.type || original.type,
          speed: ramConfig.speed || original.speed
        };

        if (editProduct?.ramId) {
          await RamService.updateRAM(editProduct.ramId, mergedRamData);
        } else {
          const imageFiles = ramImages.filter(f => f.originFileObj).map(f => f.originFileObj);
          await RamService.createRAM({ data: mergedRamData, file: imageFiles });
        }

        setRamImages([]);
      }



      // ------------- Common Post-Update -------------
      queryClient.invalidateQueries(["products"]);
      setIsModalVisible(false);
      message.success("Cập nhật product thành công!");
    },
    onError: (error) => {
      message.error(`Cập nhật product thất bại: ${error.message}`);
    },
    });

    const deleteProductMutation = useMutation({
        mutationFn: (id) => ProductService.deleteProduct(id),
        onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
        message.success("Xóa product thành công!");
        },
        onError: (error) => {
        message.error(`Xóa product thất bại: ${error.message}`);
        },
    });

    const handleCreateProduct = () => {
        setEditProduct(null);
        setSelectedCategory(null);
        setLaptopConfig({ ram: "", cpu: "", storage: "", screen: "" });
        setScreenConfig({
            screenType: "",
            screenSize: "",
            resolution: "",
            refreshRate: "",
            aspectRatio: "",
            touchscreen: false,
        });
        setMousepadConfig({
            material: "",
            size: "",
        });

        setMouseConfig({
            color: "",
            connectivityType: "",
            dpi: "",
        });
        setHeadphoneConfig({
            batteryLife: "",
            color: "",
            connectivityType: "",
        });
        setCpuConfig({
            socket: "",
            cpuType: "",
            threads: "",
            multiplier: ""
        });
        setMainConfig({
            chipset: "",
            memory: "",
            integratedGraphics: "",
            audio: "",
            lan: ""
        });
        setVgaConfig({
            architecture: "",
            cudaCores: "",
            rtCores: "",
            tensorCores: ""
        });
        setRamConfig({
            capacity: "",
            type: "",
            speed: ""
        });


        setScreenImages([]);
        setLaptopImages([]);
        setMouseImages([]);
        setMousepadImages([]);
            setHeadphoneImages([]);
        setVgaImages([]);
        setRamImages([]);
        setCpuImages([]);
        setMainImages([]);
        form.resetFields();
        setIsModalVisible(true);
    };

const handleEditProduct = async (product) => {
    const productDetail = await ProductService.getProductDetail(product.productId);
    setEditProduct(productDetail);

    const category = categories.find((cat) => cat.categoryId === productDetail.category?.categoryId);
    setSelectedCategory(category);

    const laptop = productDetail.laptops?.[0];
    const screen = productDetail.screens?.[0];
    const mouse = productDetail.mice?.[0];
    const mousepad = productDetail.mousepads?.[0];
    const headphone = productDetail.headphones?.[0];
    const cpu = productDetail.cpus?.[0];
    const main = productDetail.mainboards?.[0];
    const vga = productDetail.vgas?.[0];
    const ram = productDetail.rams?.[0];


    setLaptopConfig({
        ram: laptop?.ram || "",
        cpu: laptop?.cpu || "",
        storage: laptop?.storage || "",
        screen: laptop?.screen || "",
    });

    setScreenConfig({
        screenType: screen?.screenType || "",
        screenSize: screen?.screenSize || "",
        resolution: screen?.resolution || "",
        refreshRate: screen?.refreshRate || "",
        aspectRatio: screen?.aspectRatio || "",
        touchscreen: screen?.touchscreen || false,
    });

    setMouseConfig({
        color: mouse?.color || "",
        connectivityType: mouse?.connectivityType || "",
        dpi: mouse?.dpi || "",
      });

      setMousepadConfig({
        material: mousepad?.material || "",
        size: mousepad?.size || ""
      });

      setHeadphoneConfig({
        batteryLife: headphone?.batteryLife || "",
        color: headphone?.color || "",
        connectivityType: headphone?.connectivityType || ""
      });

      setCpuConfig({
        socket: cpu?.socket || "",
        cpuType: cpu?.cpuType || "",
        threads: cpu?.threads || "",
        multiplier: cpu?.multiplier || ""
      });

      setMainConfig({
        chipset: main?.chipset || "",
        memory: main?.memory || "",
        integratedGraphics: main?.integratedGraphics || "",
        audio: main?.audio || "",
        lan: main?.lan || ""
      });

      setVgaConfig({
        architecture: vga?.architecture || "",
        cudaCores: vga?.cudaCores || "",
        rtCores: vga?.rtCores || "",
        tensorCores: vga?.tensorCores || ""
      });

      setRamConfig({
        capacity: ram?.capacity || "",
        type: ram?.type || "",
        speed: ram?.speed || ""
      });
    const imageList = productDetail.images?.map((img, index) => ({
      uid: `${index}`,
      name: img.url?.split("/").pop() || `image-${index}`,
      status: "done",
      url: img.url,
    })) || [];

    setLaptopImages(imageList);
    setScreenImages(imageList);
    setMouseImages(imageList);
    setMousepadImages(imageList);
    setHeadphoneImages(imageList);
    setCpuImages(imageList);
    setMainImages(imageList);
    setVgaImages(imageList);
    setRamImages(imageList);


    form.setFieldsValue({
      name: productDetail.name,
      description: productDetail.description,
      price: productDetail.price,
      categoryId: productDetail.category?.categoryId,
      brandId: productDetail.brand?.brandId,
      stockQuantity: productDetail.stockQuantity,
    });

    setEditProduct({
        ...productDetail,
        laptopId: laptop?.laptopId || null,
        originalLaptop: laptop || {},
        screenId: screen?.screenId || null,
        originalScreen: screen || {},
        mouseId: mouse?.miceId || null,
        originalMouse: mouse || {},
        mousepadId: productDetail.mousepads?.[0]?.mousePadId || null,
        originalMousepad: productDetail.mousepads?.[0] || {},
        headphoneId: headphone?.headphoneId || null,
        originalHeadphone: productDetail.headphones?.[0] || {},
        cpuId: productDetail.cpus?.[0]?.cpuId || null,
        originalCPU: productDetail.cpus?.[0] || {},
        mainId: productDetail.mainboards?.[0]?.mainId || null,
        originalMain: productDetail.mainboards?.[0] || {},
        vgaId: productDetail.vgas?.[0]?.vgaId || null,
        originalVGA: productDetail.vgas?.[0] || {},
        ramId: productDetail.rams?.[0]?.ramId || null,
        originalRam: productDetail.rams?.[0] || {},
      });

    setIsModalVisible(true);
  };



  const handleSaveProduct = () => {
    form.validateFields().then((values) => {
      const productData = {
        ...values,
        price: String(values.price),
        stockQuantity: String(values.stockQuantity),
        category: { categoryId: values.categoryId },
        brand: { brandId: values.brandId },
      };
      if (editProduct) {
        updateProductMutation.mutate({ id: editProduct.productId, data: productData });
      } else {
        createProductMutation.mutate(productData);
      }
    });
  };

  const handleCategoryChange = (categoryId) => {
    const category = categories.find((cat) => cat.categoryId === categoryId);
    setSelectedCategory(category);
    if (category?.name === "Laptop") {
      setIsLaptopConfigModalVisible(true);
    } else {
      setLaptopConfig({ ram: "", cpu: "", storage: "", screen: "" });
      setLaptopImages([]);
      setIsLaptopConfigModalVisible(false);
    }

    if (category?.name === "Screen") {
        setIsScreenModalVisible(true);
      } else {
        setIsScreenModalVisible(false);
        setScreenConfig({ screenType: "", screenSize: "", resolution: "", refreshRate: "", aspectRatio: "", touchscreen: false });
        setScreenImages([]);
      }
      if (category?.name === "Mice") {
        setIsMouseModalVisible(true);
      } else {
        setIsMouseModalVisible(false);
        setMouseConfig({ color: "", connectivityType: "", dpi: "" });
        setMouseImages([]);
      }
      if (category?.name === "MousePad") {
        setIsMousepadModalVisible(true);
      } else {
        setIsMousepadModalVisible(false);
        setMousepadConfig({ material: "", size: "" });
        setMousepadImages([]);
      }
      if (category?.name === "HeadPhone") {
        setIsHeadphoneModalVisible(true);
      } else {
        setIsHeadphoneModalVisible(false);
        setHeadphoneConfig({ batteryLife: "", color: "", connectivityType: "" });
        setHeadphoneImages([]);
      }
      if (category?.name === "Main") {
        setIsMainModalVisible(true);
      } else {
        setIsMainModalVisible(false);
        setMainConfig({
          chipset: "",
          memory: "",
          integratedGraphics: "",
          audio: "",
          lan: ""
        });
        setMainImages([]);
      }
      if (category?.name === "CPU") {
        setIsCPUModalVisible(true);
      } else {
        setIsCPUModalVisible(false);
        setCpuConfig({
            cpuType: "",
            socket: "",
            threads: "",
            multiplier: ""
        });
        setCpuImages([]);
      }

      if (category?.name === "VGA") {
        setIsVGAModalVisible(true);
      } else {
        setIsVGAModalVisible(false);
        setVgaConfig({
          architecture: "",
          cudaCores: "",
          rtCores: "",
          tensorCores: ""
        });
        setVgaImages([]);
      }
      if (category?.name === "RAM") {
        setIsRAMModalVisible(true);
      } else {
        setIsRAMModalVisible(false);
        setRamConfig({ capacity: "", type: "", speed: "" });
        setRamImages([]);
      }
  };

  const handleSaveLaptopConfig = () => {
    if (!laptopConfig.ram || !laptopConfig.cpu || !laptopConfig.storage || !laptopConfig.screen) {
      message.error("Vui lòng chọn đầy đủ cấu hình laptop!");
      return;
    }
    setIsLaptopConfigModalVisible(false);
  };

  const handleSaveScreenConfig = () => {
    if (!screenConfig.screenType || !screenConfig.resolution) {
      message.error("Vui lòng nhập đầy đủ thông tin màn hình!");
      return;
    }
    setIsScreenModalVisible(false);
  };

  const handleSaveMouseConfig = () => {
    if (!mouseConfig.color || !mouseConfig.connectivityType || !mouseConfig.dpi) {
      message.error("Vui lòng chọn đầy đủ cấu hình chuột!");
      return;
    }
    setIsMouseModalVisible(false);
  };

  const handleSaveHeadphoneConfig = () => {
    if (!headphoneConfig.batteryLife || !headphoneConfig.color || !headphoneConfig.connectivityType) {
      message.error("Vui lòng nhập đầy đủ thông tin tai nghe!");
      return;
    }
    setIsHeadphoneModalVisible(false);
  };

  const handleSaveRamConfig = () => {
    if (!ramConfig.capacity || !ramConfig.type || !ramConfig.speed) {
      message.error("Vui lòng nhập đầy đủ thông tin RAM!");
      return;
    }
    setIsRAMModalVisible(false);
  };

  const handleSaveMainConfig = () => {
    if (!mainConfig.main || !mainConfig.chipset || !mainConfig.boNho || !mainConfig.doHoaTichHop || !mainConfig.audio || !mainConfig.lan) {
      message.error("Vui lòng nhập đầy đủ thông tin Mainboard!");
      return;
    }
    setIsMainModalVisible(false);
  };

  const handleSaveCpuConfig = () => {
    if (!cpuConfig.socket || !cpuConfig.cpuType || !cpuConfig.threads || !cpuConfig.multiplier) {
      message.error("Vui lòng nhập đầy đủ thông tin CPU!");
      return;
    }
    setIsCPUModalVisible(false);
  };

  const handleSaveVgaConfig = () => {
    if (!vgaConfig.architecture || !vgaConfig.cudaCores || !vgaConfig.rtCores || !vgaConfig.tensorCores) {
      message.error("Vui lòng nhập đầy đủ thông tin VGA!");
      return;
    }
    setIsVGAModalVisible(false);
  };

  const columns = [
    { title: "ID", dataIndex: "productId", key: "productId" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "Giá", dataIndex: "price", key: "price" },
    {
        title: "Danh mục",
        dataIndex: "category",
        key: "category",
        render: (category) => category?.name || "",
      },
      {
        title: "Thương hiệu",
        dataIndex: "brand",
        key: "brand",
        render: (brand) => brand?.name || "",
      },
    { title: "Tồn kho", dataIndex: "stockQuantity", key: "stockQuantity" },
    {
        title: "Ảnh",
        dataIndex: "urlImg",
        key: "urlImg",
        render: (url) => (
          <img src={url} alt="Ảnh sản phẩm" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }} />
        ),
      },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEditProduct(record)}>Sửa</Button>
          <Popconfirm title="Xóa?" onConfirm={() => deleteProductMutation.mutate(record.productId)}>
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];




// const columns = [
//     { title: "ID", dataIndex: "productId", key: "productId" },
//     { title: "Tên", dataIndex: "name", key: "name" },
//     { title: "Mô tả", dataIndex: "description", key: "description" },
//     { title: "Giá", dataIndex: "price", key: "price" },
//     {
//         title: "Danh mục",
//         dataIndex: "category",
//         key: "category",
//         render: (category) => category?.name || "",
//       },
//       {
//         title: "Thương hiệu",
//         dataIndex: "brand",
//         key: "brand",
//         render: (brand) => brand?.name || "",
//       },
//     { title: "Tồn kho", dataIndex: "stockQuantity", key: "stockQuantity" },
//     {
//         title: "Ảnh",
//         dataIndex: "urlImg",
//         key: "urlImg",
//         render: (url) => (
//           <img src={url} alt="Ảnh sản phẩm" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }} />
//         ),
//       },
//     {
//       title: "Hành động",
//       key: "action",
//       render: (_, record) => (
//         <Space>
//           <Button type="primary" onClick={() => handleEditProduct(record)}>Sửa</Button>
//           <Popconfirm title="Xóa?" onConfirm={() => deleteProductMutation.mutate(record.productId)}>
//             <Button danger>Xóa</Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];
  return (
    <div style={{ padding: "20px" }}>
      <h1>Quản lý Product</h1>
      <Button type="primary" onClick={handleCreateProduct} style={{ marginBottom: 20 }}>
        Tạo Product
      </Button>
      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <Input.Search
            placeholder="Tìm theo tên"
            allowClear
            onSearch={(value) =>
            setFilters((prev) => ({ ...prev, name: value, page: 0 }))
            }
            style={{ width: 200 }}
        />
        <Select
            placeholder="Lọc theo thương hiệu"
            allowClear
            style={{ width: 200 }}
            value={filters.brandId}
            onChange={(value) =>
            setFilters((prev) => ({ ...prev, brandId: value ?? null, page: 0 }))
            }
        >
            {brands?.map((b) => (
            <Option key={b.brandId} value={b.brandId}>
                {b.name}
            </Option>
            ))}
        </Select>
        <Select
            placeholder="Lọc theo danh mục"
            allowClear
            style={{ width: 200 }}
            value={filters.categoryId}
            onChange={(value) =>
            setFilters((prev) => ({ ...prev, categoryId: value ?? null, page: 0 }))
            }
        >
            {categories?.map((c) => (
            <Option key={c.categoryId} value={c.categoryId}>
                {c.name}
            </Option>
            ))}
        </Select>
        </div>





                        <Table
                columns={columns}
                dataSource={productData?.response || []}
                pagination={paginationInfo}
                rowKey="productId"
                onChange={handleTableChange}
                />




      <Modal
        width={800}
        title={editProduct ? "Chỉnh sửa Product" : "Tạo Product"}
        open={isModalVisible}
        onOk={handleSaveProduct}
        onCancel={() => setIsModalVisible(false)}
        okButtonProps={{
          style: { backgroundColor: "#1890ff", borderColor: "#1890ff" },
          loading: createProductMutation.isLoading || updateProductMutation.isLoading,
        }}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}>
            <Select onChange={handleCategoryChange}>
              {categories?.map((cat) => (
                <Option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
            {selectedCategory?.name === "Laptop" && (
                     <div style={{ marginBottom: 16 }}>
                    <Text strong>Cấu hình Laptop:</Text><br />
                    <Text>
                    RAM: {laptopConfig.ram || "?"} | CPU: {laptopConfig.cpu || "?"} | SSD: {laptopConfig.storage || "?"} | Màn: {laptopConfig.screen || "?"}
                    </Text><br />
                    <Text>Ảnh:</Text>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {laptopImages.length > 0 ? (
                        laptopImages.map((file, index) => (
                        <img
                            key={index}
                            src={file.url}
                            alt={file.name}
                            style={{
                            width: 60,
                            height: 60,
                            objectFit: 'cover',
                            borderRadius: 4,
                            border: '1px solid #ddd',
                            }}
                        />
                    ))
                ) : (
                    <Text type="secondary">Chưa có</Text>
                )}
                </div>
                <Button type="link" onClick={() => setIsLaptopConfigModalVisible(true)} style={{ marginTop: 8 }}>
                Chỉnh sửa cấu hình
                </Button>
            </div>
            )}
            {selectedCategory?.name === "Screen" && (
                    <div style={{ marginBottom: 16 }}>
                        <Text strong>Cấu hình Màn hình:</Text><br />
                        <Text>
                        Loại: {screenConfig.screenType || "?"} |
                        Kích thước: {screenConfig.screenSize || "?"} |
                        Độ phân giải: {screenConfig.resolution || "?"} |
                        Tốc độ làm mới: {screenConfig.refreshRate || "?"} |
                        Tỉ lệ: {screenConfig.aspectRatio || "?"} |
                        Cảm ứng: {screenConfig.touchscreen ? "Có" : "Không"}
                        </Text><br />
                        <Text>Ảnh:</Text>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                        {screenImages.length > 0 ? (
                            screenImages.map((file, index) => (
                            <img
                                key={index}
                                src={file.url}
                                alt={file.name}
                                style={{
                                width: 60,
                                height: 60,
                                objectFit: 'cover',
                                borderRadius: 4,
                                border: '1px solid #ddd',
                                }}
                            />
                            ))
                        ) : (
                            <Text type="secondary">Chưa có</Text>
                        )}
                        </div>

                <Button type="link" onClick={() => setIsScreenModalVisible(true)} style={{ marginTop: 8 }}>
                Chỉnh sửa cấu hình
                </Button>
            </div>
            )}
             {selectedCategory?.name === "Mice" && (
                <div style={{ marginBottom: 16 }}>
                    <Typography.Text strong>Cấu hình Chuột:</Typography.Text><br />
                    <Typography.Text>
                    Màu: {mouseConfig.color || "?"} |
                    Kết nối: {mouseConfig.connectivityType || "?"} |
                    DPI: {mouseConfig.dpi || "?"}
                    </Typography.Text><br />
                    <Typography.Text>Ảnh:</Typography.Text>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {mouseImages.length > 0 ? (
                        mouseImages.map((file, index) => (
                        <img
                            key={index}
                            src={file.url}
                            alt={file.name}
                            style={{
                            width: 60,
                            height: 60,
                            objectFit: 'cover',
                            borderRadius: 4,
                            border: '1px solid #ddd',
                            }}
                        />
                        ))
                    ) : (
                        <Typography.Text type="secondary">Chưa có</Typography.Text>
                    )}
                    </div>
                        <Button type="link" onClick={() => setIsMouseModalVisible(true)} style={{ marginTop: 8 }}>
                        Chỉnh sửa cấu hình
                        </Button>
                    </div>
            )}
            {selectedCategory?.name === "MousePad" && (
            <div style={{ marginBottom: 16 }}>
                <Typography.Text strong>Cấu hình Mousepad:</Typography.Text><br />
                <Typography.Text>
                Chất liệu: {mousepadConfig.material || "?"} | Kích thước: {mousepadConfig.size || "?"}
                </Typography.Text><br />
                <Typography.Text>Ảnh:</Typography.Text>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                {mousepadImages.length > 0 ? (
                    mousepadImages.map((file, index) => (
                    <img
                        key={index}
                        src={file.url}
                        alt={file.name}
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #ddd' }}
                    />
                    ))
                ) : (
                    <Typography.Text type="secondary">Chưa có</Typography.Text>
                )}
                </div>
                <Button type="link" onClick={() => setIsMousepadModalVisible(true)} style={{ marginTop: 8 }}>
                Chỉnh sửa cấu hình
                </Button>
            </div>
            )}
            {selectedCategory?.name === "HeadPhone" && (
            <div style={{ marginBottom: 16 }}>
              <Typography.Text strong>Cấu hình Tai nghe:</Typography.Text><br />
              <Typography.Text>
                Thời lượng pin: {headphoneConfig.batteryLife || "?"} giờ |
                Màu: {headphoneConfig.color || "?"} |
                Kết nối: {headphoneConfig.connectivityType || "?"}
              </Typography.Text><br />
              <Typography.Text>Ảnh:</Typography.Text>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                {headphoneImages.length > 0 ? (
                  headphoneImages.map((file, index) => (
                    <img
                      key={index}
                      src={file.url}
                      alt={file.name}
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #ddd' }}
                    />
                  ))
                ) : (
                  <Typography.Text type="secondary">Chưa có</Typography.Text>
                )}
              </div>
              <Button type="link" onClick={() => setIsHeadphoneModalVisible(true)} style={{ marginTop: 8 }}>
                Chỉnh sửa cấu hình
              </Button>
            </div>
            )}
            {selectedCategory?.name === "MainBoard" && (
                <div style={{ marginBottom: 16 }}>
                    <Typography.Text strong>Cấu hình Mainboard:</Typography.Text><br />
                    <Typography.Text>
                    Chipset: {mainConfig.chipset || "?"} | Bộ nhớ: {mainConfig.memory || "?"} <br />
                    Đồ họa tích hợp: {mainConfig.integratedGraphics || "?"} | Audio: {mainConfig.audio || "?"} | LAN: {mainConfig.lan || "?"}
                    </Typography.Text><br />
                    <Typography.Text>Ảnh:</Typography.Text>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {mainImages.length > 0 ? (
                        mainImages.map((file, index) => (
                        <img
                            key={index}
                            src={file.url}
                            alt={file.name}
                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #ddd' }}
                        />
                        ))
                    ) : (
                        <Typography.Text type="secondary">Chưa có</Typography.Text>
                    )}
                    </div>
                    <Button type="link" onClick={() => setIsMainModalVisible(true)} style={{ marginTop: 8 }}>
                    Chỉnh sửa cấu hình
                    </Button>
                </div>
            )}
            {selectedCategory?.name === "CPU" && (
                <div style={{ marginBottom: 16 }}>
                    <Typography.Text strong>Cấu hình CPU:</Typography.Text><br />
                    <Typography.Text>
                        Socket: {cpuConfig.socket || "?"} |
                        Dòng CPU: {cpuConfig.cpuType || "?"} |
                        Số luồng: {cpuConfig.threads || "?"} |
                        Hệ số nhân: {cpuConfig.multiplier || "?"}
                    </Typography.Text><br />
                    <Typography.Text>Ảnh:</Typography.Text>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {cpuImages.length > 0 ? (
                        cpuImages.map((file, index) => (
                            <img
                                key={index}
                                src={file.url}
                                alt={file.name}
                                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #ddd' }}
                            />
                        ))
                    ) : (
                        <Typography.Text type="secondary">Chưa có</Typography.Text>
                    )}
                    </div>
                    <Button type="link" onClick={() => setIsCPUModalVisible(true)} style={{ marginTop: 8 }}>
                    Chỉnh sửa cấu hình
                    </Button>
                </div>
            )}
            {selectedCategory?.name === "VGA" && (
                <div style={{ marginBottom: 16 }}>
                    <Typography.Text strong>Cấu hình VGA:</Typography.Text><br />
                    <Typography.Text>
                    Architecture: {vgaConfig.architecture || "?"} |
                    CUDA Cores: {vgaConfig.cudaCores || "?"} |
                    RT Cores: {vgaConfig.rtCores || "?"} |
                    Tensor Cores: {vgaConfig.tensorCores || "?"}
                    </Typography.Text><br />
                    <Typography.Text>Ảnh:</Typography.Text>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {vgaImages.length > 0 ? (
                        vgaImages.map((file, index) => (
                        <img
                            key={index}
                            src={file.url}
                            alt={file.name}
                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #ddd' }}
                        />
                        ))
                    ) : (
                        <Typography.Text type="secondary">Chưa có</Typography.Text>
                    )}
                    </div>
                    <Button type="link" onClick={() => setIsVGAModalVisible(true)} style={{ marginTop: 8 }}>
                    Chỉnh sửa cấu hình
                    </Button>
                </div>
            )}
            {selectedCategory?.name === "RAM" && (
                <div style={{ marginBottom: 16 }}>
                    <Typography.Text strong>Cấu hình RAM:</Typography.Text><br />
                    <Typography.Text>
                    Dung lượng: {ramConfig.capacity || "?"} |
                    Loại: {ramConfig.type || "?"} |
                    Tốc độ: {ramConfig.speed || "?"}
                    </Typography.Text><br />
                    <Typography.Text>Ảnh:</Typography.Text>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {ramImages.length > 0 ? (
                        ramImages.map((file, index) => (
                        <img
                            key={index}
                            src={file.url}
                            alt={file.name}
                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #ddd' }}
                        />
                        ))
                    ) : (
                        <Typography.Text type="secondary">Chưa có</Typography.Text>
                    )}
                    </div>
                    <Button type="link" onClick={() => setIsRAMModalVisible(true)} style={{ marginTop: 8 }}>
                    Chỉnh sửa cấu hình
                    </Button>
                </div>
            )}
          <Form.Item name="brandId" label="Thương hiệu" rules={[{ required: true }]}>
            <Select>
              {brands?.map((brand) => (
                <Option key={brand.brandId} value={brand.brandId}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="stockQuantity" label="Tồn kho" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

        <LaptopModal
            visible={isLaptopConfigModalVisible}
            onCancel={() => setIsLaptopConfigModalVisible(false)}
            onOk={handleSaveLaptopConfig}
            laptopConfig={laptopConfig}
            setLaptopConfig={setLaptopConfig}
            laptopImages={laptopImages}
            setLaptopImages={setLaptopImages}
            ramOptions={ramOptions}
            cpuOptions={cpuOptions}
            storageOptions={storageOptions}
            screenOptions={screenOptions}
        />

        <ScreenModal
            visible={isScreenModalVisible}
            onCancel={() => setIsScreenModalVisible(false)}
            onOk={handleSaveScreenConfig}
            screenConfig={screenConfig}
            setScreenConfig={setScreenConfig}
            screenImages={screenImages}
            setScreenImages={setScreenImages}
            screenTypeOptions={screenTypeOptions}
            screenSizeOptions={screenSizeOptions}
            resolutionOptions={resolutionOptions}
            refreshRateOptions={refreshRateOptions}
            aspectRatioOptions={aspectRatioOptions}
        />

        <MiceModal
            visible={isMouseModalVisible}
            onCancel={() => setIsMouseModalVisible(false)}
            onOk={handleSaveMouseConfig}
            mouseConfig={mouseConfig}
            setMouseConfig={setMouseConfig}
            mouseImages={mouseImages}
            setMouseImages={setMouseImages}
            colorOptions={colorOptions}
            connectivityOptions={connectivityOptions}
            dpiOptions={dpiOptions}
        />

        <MousepadModal
            visible={isMousepadModalVisible}
            onCancel={() => setIsMousepadModalVisible(false)}
            onOk={() => {
                if (!mousepadConfig.material || !mousepadConfig.size) {
                message.error("Vui lòng nhập đầy đủ thông tin mousepad!");
                return;
                }
                setIsMousepadModalVisible(false);
            }}
            mousepadConfig={mousepadConfig}
            setMousepadConfig={setMousepadConfig}
            mousepadImages={mousepadImages}
            setMousepadImages={setMousepadImages}
            materialOptions={materialOptions}
            sizeOptions={sizeOptions}
        />

        <HeadphoneModal
            visible={isHeadphoneModalVisible}
            onCancel={() => setIsHeadphoneModalVisible(false)}
            onOk={handleSaveHeadphoneConfig}
            headphoneConfig={headphoneConfig}
            setHeadphoneConfig={setHeadphoneConfig}
            headphoneImages={headphoneImages}
            setHeadphoneImages={setHeadphoneImages}
            colorOptions={colorOptions}
            connectivityOptions={connectivityOptions}
            batteryLifeOptions={batteryLifeOptions}
        />
        <MainModal
            visible={isMainModalVisible}
            onCancel={() => setIsMainModalVisible(false)}
            onOk={handleSaveMainConfig}
            mainConfig={mainConfig}
            setMainConfig={setMainConfig}
            mainImages={mainImages}
            setMainImages={setMainImages}
        />
        <CPUModal
            visible={isCPUModalVisible}
            onCancel={() => setIsCPUModalVisible(false)}
            onOk={handleSaveCpuConfig}
            cpuConfig={cpuConfig}
            setCpuConfig={setCpuConfig}
            cpuImages={cpuImages}
            setCpuImages={setCpuImages}
        />
        <VGAModal
            visible={isVGAModalVisible}
            onCancel={() => setIsVGAModalVisible(false)}
            onOk={handleSaveVgaConfig}
            vgaConfig={vgaConfig}
            setVgaConfig={setVgaConfig}
            vgaImages={vgaImages}
            setVgaImages={setVgaImages}
        />

       <RAMModal
            visible={isRAMModalVisible}
            onCancel={() => setIsRAMModalVisible(false)}
            onOk={handleSaveRamConfig}
            ramConfig={ramConfig}
            setRamConfig={setRamConfig}
            ramImages={ramImages}
            setRamImages={setRamImages}
            />
    </div>
  );
};

export default Product;