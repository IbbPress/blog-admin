import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Icon ,message, Avatar } from 'antd';
import { Route } from "react-router-dom";
import axios from 'axios'

import ArticleList from "./Article/List";
import ArticleAdd from "./Article/Add";
import Dashboard from "./Dashboard";

import  servicePath  from '../config/apiUrl'
import "../static/styles/home.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Home (props) {

  const [ collapsed, setCollapsed ] = useState(false)
  const [ theme ] = useState('light')

  const onCollapsed = () => setCollapsed(!collapsed)

  const handleClickArticle = e => {
    if (e.key === 'addArticle') {
      props.history.push('/index/add')
    } else {
      props.history.push('/index/list')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('openId')
    axios({
      method:'get',
      url:servicePath.outLogin,
      header:{ 'Access-Control-Allow-Origin':'*' },
      withCredentials:true
    }).then(
      res=>{
        if(res.data.data === '退出成功')
        {
          message.success('已退出')
          setTimeout(()=>{
            props.history.push('/')
          },1000)
        }
      }
    )
  }
  const sider = (
    <Sider theme={theme} collapsible collapsed={collapsed} onCollapse={onCollapsed}>
      <div className="logo">blog</div>
      <Menu defaultSelectedKeys={ ['1'] } mode="inline">
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span>工作台</span>
        </Menu.Item>
        
        <SubMenu
          key="sub1"
          onClick={handleClickArticle}
          title={
            <span>
              <Icon type="desktop" />
              <span>文章管理</span>
            </span>
          }
        >
          <Menu.Item key="addArticle">添加文章</Menu.Item>
          <Menu.Item key="articleList">文章列表</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )

  const avatarMenu = (
    <Menu>
      <Menu.Item>
        <Icon type="user" />
        <span>个人中心</span>
      </Menu.Item>
      <Menu.Item>
        <Icon type="setting" />
        <span>个人设置</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="10" onClick={handleLogout}>
        <Icon type="logout" />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      { sider }
      <Layout>
        <Header className="header" >
          <section>
            <div className="sider-trigger" onClick={onCollapsed}>
              { collapsed
                ? <Icon type="menu-unfold" className="menu-fold"/>
                : <Icon type="menu-fold" className="menu-fold"/>
              }
            </div>
            <Breadcrumb>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
          </section>

          <Dropdown className="header-avatar" overlay={avatarMenu}>
            <div>
              <Avatar icon="user" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
              <span className="username">wencaizhang</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: '16px' }}>
          
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index/" exact  component={Dashboard} />
              <Route path="/index/add/" exact   component={ArticleAdd} />
              <Route path="/index/add/:id"  exact   component={ArticleAdd} />
              <Route path="/index/list/"   component={ArticleList} />
            </div>
          </div>

        </Content>
        <Footer style={{ textAlign: 'center' }}>blog</Footer>
      </Layout>
    </Layout>


  )
}

export default Home;