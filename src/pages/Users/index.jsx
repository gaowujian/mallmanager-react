import { Breadcrumb, Button, Card, Input, message, Space, Table, Switch } from "antd";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import "./style.less";
import http from "@/utils/http";
import HomeLayout from "../Home";
import { format } from "date-fns";
import { CheckOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const columns = [
  {
    dataIndex: "num",
    key: "num",
    title: "#",
    render(text, record, index) {
      return <span>{index}</span>;
    },
  },
  {
    title: "姓名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "电话",
    dataIndex: "mobile",
    key: "mobile",
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    key: "create_time",
    render(text, record) {
      return <span>{format(text, "yyyy-MM-dd")}</span>;
    },
  },
  {
    title: "用户状态",
    dataIndex: "mg_state",
    key: "mg_state",
    render(text) {
      return <Switch defaultChecked={text} />;
    },
  },
  {
    title: "操作",
    dataIndex: "actions",
    key: "actions",
    render() {
      return (
        <Space direction="horizontal">
          <Button shape="circle" type="primary" icon={<EditOutlined />} />
          <Button shape="circle" icon={<CheckOutlined />} />
          <Button shape="circle" danger icon={<DeleteOutlined />} />
        </Space>
      );
    },
  },
];

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "INIT":
      return { ...state, total: payload };
    case "CHANGE_PAGE":
    case "CHANGE_PAGE_SIZE":
      return { ...state, ...payload };
    case "UPDATE":
      return { ...state, ...payload };
    default:
      return state;
  }
};

function Users() {
  const [dataSource, setDataSource] = useState([]);
  const [query, setQuery] = useState("");
  const [pagination, dispatch] = useReducer(reducer, {
    current: 1,
    pageSize: 3,
    total: -1,
    showSizeChanger: true,
    pageSizeOptions: ["1", "2", "3", "4"],
    showTotal: (total) => `Total ${total} times`,
    onChange: (page, pageSize) => {
      getUserList(page, pageSize);
    },
    onShowSizeChange: (current, pageSize) => {
      getUserList(current, pageSize);
    },
  });

  const getUserList = useCallback(
    async function (current, pageSize) {
      const {
        data,
        meta: { msg, status },
      } = await http.get("/users", {
        params: {
          query: query,
          pagenum: current || pagination.current,
          pagesize: pageSize || pagination.pageSize,
        },
      });
      if (status === 200) {
        setDataSource(data.users);
        dispatch({
          type: "UPDATE",
          payload: {
            current: current || pagination.current,
            pagesize: pageSize || pagination.pageSize,
            total: data.total,
          },
        });
        message.success(msg);
      } else {
        message.error(msg);
      }
    },

    [query, pagination]
  );
  // 初始化数据
  /* eslint-disable */
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <HomeLayout>
      <div className="user-container">
        <Card key="body">
          <Space direction="vertical" className="user-content">
            <Breadcrumb key="breadcrumb">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>用户管理</Breadcrumb.Item>
              <Breadcrumb.Item>用户列表</Breadcrumb.Item>
            </Breadcrumb>
            <Space key="search">
              <Input.Search enterButton />
              <Button>添加用户</Button>
            </Space>
            {JSON.stringify(dataSource)}
            <Table columns={columns} dataSource={dataSource} pagination={pagination} />
          </Space>
        </Card>
      </div>
    </HomeLayout>
  );
}

export default Users;
