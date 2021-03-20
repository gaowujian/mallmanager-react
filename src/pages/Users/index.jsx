import { Breadcrumb, Button, Card, Input, message, Space, Table, Switch, Form, Modal } from "antd";
import React, { useState, useEffect, useRef } from "react";
import "./style.less";
import http from "@/utils/http";
import HomeLayout from "../Home";
import { format } from "date-fns";
import { CheckOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { values } from "lodash";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
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
  const [form] = Form.useForm();
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
    if (status === 200) {
      setPagination({ ...newPagination, total: data.total });
      // ! 需要数据里每条数据里带一个key值
      setDataSource(
        data.users.map((user) => {
          return { ...user, key: user.id };
        })
      );
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
    form
      .validateFields()
      .then(async (values) => {
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
      })
      .catch((err) => {
        console.log("表单验证错误:", err);
      });
  };
  return (
    <HomeLayout>
      <div className="user-container">
        <Card>
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
            <Table columns={columns} dataSource={dataSource} pagination={pagination} onChange={handleChange} />
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
            <Form form={form} {...formItemLayout} name="userAddForm">
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
        </Card>
      </div>
    </HomeLayout>
  );
}

export default Users;
