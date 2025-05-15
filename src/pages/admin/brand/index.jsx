import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TableDataGrid from "../../../components/TableDataGrid";
import BrandService from "../../../service/AdminService/BrandService";

const Brand = () => {
  const queryClient = useQueryClient();
  const [newBrand, setNewBrand] = useState({ name: "", description: "" });

  const { data: brands, isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: () => BrandService.getAllBrands(),
  });

  const createBrandMutation = useMutation({
    mutationFn: (data) => BrandService.createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      setNewBrand({ name: "", description: "" });
    },
    onError: (error) => {
      console.error("Error creating brand:", error);
    },
  });

  const handleCreateBrand = () => {
    createBrandMutation.mutate(newBrand);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "brandId",
      key: "brandId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl">Brand Controller</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Brand Name"
          value={newBrand.name}
          onChange={(e) =>
            setNewBrand({ ...newBrand, name: e.target.value })
          }
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newBrand.description}
          onChange={(e) =>
            setNewBrand({ ...newBrand, description: e.target.value })
          }
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button
          onClick={handleCreateBrand}
          style={{
            padding: "5px 10px",
            backgroundColor: "#1890ff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Create Brand
        </button>
      </div>
      <TableDataGrid columns={columns} dataSource={brands || []} />
    </div>
  );
};

export default Brand;