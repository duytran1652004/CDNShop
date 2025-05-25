import React from "react";
import { Table } from "antd";

const TableDataGrid = ({ columns, dataSource, rowKey, pagination, onChange }) => {
    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={rowKey}
        pagination={pagination}
        bordered
        onChange={onChange}
      />
    );
  };

export default TableDataGrid;