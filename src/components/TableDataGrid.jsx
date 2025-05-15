import React from "react";
import { Table } from "antd";

const TableDataGrid = ({ columns, dataSource }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
    />
  );
};

export default TableDataGrid;