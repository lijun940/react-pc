import React, { Component } from 'react'
import { Breadcrumb, Layout, Menu,Popconfirm, message } from 'antd'
// import './index.css'
import styles from './index.module.scss'
import { Switch,Route } from 'react-router-dom'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import Home from 'pages/Home'
import ArticleList from 'pages/ArticleList'
import ArticlePublish from 'pages/ArticlePublish'
import { removeToken } from 'utils/storage'
const { Header, Content, Sider } = Layout
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}))

const items2 = [{icon:UserOutlined,name: '数据概览'}, {icon:LaptopOutlined,name:'内容管理'}, {icon:NotificationOutlined,name: '发布文章'}].map(
  (icon, index) => {
    const key = String(index + 1)

    return {
      key: `${key}`,
      icon: React.createElement(icon.icon),
      label: `${icon.name}`,

    }
  }
)
export default class LayoutComponent extends Component {
  onConfirm = () => {
    console.log('点击了确定按钮')
    removeToken()
    this.props.history.push('/login')
    message.success('退出成功')
  }
  
  handleMenu = ({item,key,keyPath,domEvent}) => {
    console.log(item,key,keyPath, domEvent)
    switch (key) {
      case '1':
        this.props.history.push('/home')
        break;
      case '2':
        this.props.history.push('/home/list')
        break;
      case '3':
        this.props.history.push('/home/publish')
        break;
        default:
          break
    }
  }
  
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>用户名</span>
              <span>
              <Popconfirm
                title="确定要退出系统么?"
                okText="确定"
                cancelText="取消"
                onConfirm={this.onConfirm}
              >
                <LogoutOutlined />
                {'  '}退出
              </Popconfirm>
              
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200}>
              <Menu
                theme='dark'
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
                items={items2}
                onClick={this.handleMenu}
              />
            </Sider>
            <Layout style={{ padding: '24px' }}>
              <Content
                className="site-layout-background"
              >
                <Switch>
                  <Route path='/home' component={Home} exact></Route>
                  <Route path='/home/list' component={ArticleList}></Route>
                  <Route path='/home/publish' component={ArticlePublish}></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
