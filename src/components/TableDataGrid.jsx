import React from "react";
import { Table } from "antd";

const TableDataGrid = ({ columns, dataSource, rowKey }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={{ pageSize: 10 }}
      bordered
    />
  );
};

export default TableDataGrid;