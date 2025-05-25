import React from "react";
import { Table } from "antd";

const TableDataGrid = ({ columns, dataSource, rowKey, pagination, onChange }) => {
    console.log("dataSource", dataSource);
    console.log("columns", columns);
    console.log("rowKey", rowKey);
    console.log("pagination", pagination);
    console.log("onChange", onChange);

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