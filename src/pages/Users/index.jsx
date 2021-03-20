import { Breadcrumb, Button, Card, Input, message, Space, Table, Switch, Form } from "antd";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "./style.less";
import http from "@/utils/http";
import HomeLayout from "../Home";
import { format } from "date-fns";
import { CheckOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { useForm } from "antd/lib/form/Form";

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

function Users() {
  const [dataSource, setDataSource] = useState([]);
  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
    total: -1,
    showSizeChanger: true,
    pageSizeOptions: ["1", "2", "3", "4"],
    showTotal: (total) => `Total ${total} times`,
  });
  const paginationRef = useRef(pagination);
  paginationRef.current = pagination;
  const queryRef = useRef(query);
  queryRef.current = query;

  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const getUserList = async function () {
    const newPagination = paginationRef.current;
    const query = queryRef.current;
    const {
      data,
      meta: { msg, status },
    } = await http.get("/users", {
      params: {
        query,
        pagenum: newPagination.current,
        pagesize: newPagination.pageSize,
      },
    });

    console.log("data:", data);
    if (status === 200) {
      setDataSource(data.users);
      setPagination({ ...newPagination, total: data.total });
      message.success(msg);
    } else {
      message.error(msg);
    }
  };
  // 初始化数据
  /* eslint-disable */
  useEffect(() => {
    getUserList();
  }, []);

  const handleChange = function (newPagination) {
    //更新pagination的值
    paginationRef.current = { ...paginationRef.current, ...newPagination };
    getUserList();
  };

  const handleSearch = function (value) {
    queryRef.current = value;
    getUserList();
  };

  const handleAddUserOk = function () {
    form.validateFields(async (err, values) => {
      if (!err) {
        const {
          meta: { msg, status },
        } = await http.post("/users", values);
        // 提示成功，关闭弹出框，清除表单数据，更新数据(调用getUserList)
        if (status === 201) {
          message.success(msg);
          getUserList();
          form.resetFields();
          setVisible(false);
        } else {
          message.error(msg);
        }
      }
    });
  };
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
              <Input.Search enterButton onSearch={handleSearch} />
              <Button onClick={() => setVisible(true)}>添加用户</Button>
            </Space>
            <Modal
              title="添加用户"
              okText="确定"
              cancelText="取消"
              onOk={handleAddUserOk}
              onCancel={() => {
                setVisible(false);
              }}
              visible={visible}
            >
              <Form form={form}>
                <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码!" }]}>
                  <Input.Password />
                </Form.Item>
                <Form.Item label="邮箱" name="email">
                  <Input />
                </Form.Item>
                <Form.Item label="电话" name="mobile">
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
            <Table columns={columns} dataSource={dataSource} pagination={pagination} onChange={handleChange} />
          </Space>
        </Card>
      </div>
    </HomeLayout>
  );
}

export default Users;
