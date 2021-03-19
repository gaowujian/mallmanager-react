import { Form, Button, Input, message } from "antd";
import React from "react";
import "./style.less";
import http from "@/utils/http";

function Login(props) {
  const [form] = Form.useForm();
  const handleOnFinish = async function (values) {
    // console.log("values:", values);
    const res = await http.post("/login", values);
    const {
      data: { token },
      meta: { msg, status },
    } = res;
    if (status === 200) {
      // 跳转路由，成功提示和缓存token
      props.history.push("/");
      message.success("登录成功");
      localStorage.setItem("token", token);
    } else {
      message.error(msg);
    }
  };
  return (
    <div className="login-container">
      <Form form={form} onFinish={handleOnFinish} layout="vertical" className="login-form ">
        <h1>用户登录</h1>
        <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入你的用户名" }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入你的密码" }]}>
          <Input placeholder="请输入用户密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
