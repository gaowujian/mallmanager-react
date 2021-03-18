import { Col, Row, Layout, Menu, message } from "antd";
import { AppstoreOutlined, TagOutlined } from "@ant-design/icons";

import React from "react";
import "./style.less";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const rootSubmenuKeys = [
  "user-management",
  "permission-management",
  "product-management",
  "order-management",
  "data-statistics",
];

const routeMap = {};
function Home(props) {
  const [openKeys, setOpenKeys] = React.useState(["user-management"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleItemClick = ({ item, key, keyPath }) => {
    const currentPath = props.location.pathname;
    if (currentPath !== `/${key}`) {
      props.history.push(`/${key}`);
    }
  };
  const handleLogout = () => {
    // 清除缓存，提示和路由跳转
    localStorage.clear();
    message.success("退出成功");
    props.history.push("/login");
  };
  return (
    <div className="home-container">
      <Layout>
        <Header className="home-header">
          <Row justify="center" align="middle">
            <Col span={4}>
              <span>logo</span>
            </Col>
            <Col span={18}>
              <h3 style={{ textAlign: "center" }}>后台管理系统</h3>
            </Col>
            <Col span={2}>
              <a onClick={handleLogout}>退出</a>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider className="home-sider">
            <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} onClick={handleItemClick}>
              <SubMenu key="user-management" icon={<AppstoreOutlined />} title="用户管理">
                <Menu.Item icon={<TagOutlined />} key="users">
                  用户列表
                </Menu.Item>
              </SubMenu>
              <SubMenu key="permission-management" icon={<AppstoreOutlined />} title="权限管理">
                <Menu.Item icon={<TagOutlined />}>角色列表</Menu.Item>
                <Menu.Item icon={<TagOutlined />}>权限列表</Menu.Item>
              </SubMenu>
              <SubMenu key="product-management" icon={<AppstoreOutlined />} title="商品管理">
                <Menu.Item icon={<TagOutlined />}>商品列表</Menu.Item>
                <Menu.Item icon={<TagOutlined />}>分类参数</Menu.Item>
                <Menu.Item icon={<TagOutlined />}>商品分类</Menu.Item>
              </SubMenu>
              <SubMenu key="order-management" icon={<AppstoreOutlined />} title="订单管理">
                <Menu.Item icon={<TagOutlined />}>订单列表</Menu.Item>
              </SubMenu>
              <SubMenu key="data-statistics" icon={<AppstoreOutlined />} title="数据统计">
                <Menu.Item icon={<TagOutlined />}>数据列表</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content className="home-content">内容区域</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Home;
