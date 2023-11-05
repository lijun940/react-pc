import React, { Component } from 'react'
import { Breadcrumb, Layout, Menu, Popconfirm, message } from 'antd'
// import './index.css'
import styles from './index.module.scss'
import { Switch, Route } from 'react-router-dom'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

import { removeToken } from 'utils/storage'
import { getUserProfile } from 'api/user'
import { history } from 'utils/history'
const Home = React.lazy(() => import('pages/Home'))
const ArticleList = React.lazy(() => import('pages/ArticleList'))
const ArticlePublish = React.lazy(() => import('pages/ArticlePublish'))
const { Header, Content, Sider } = Layout
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}))

const items2 = [
  { icon: UserOutlined, name: '数据概览', key: '/home' },
  { icon: LaptopOutlined, name: '内容管理', key: '/home/list' },
  { icon: NotificationOutlined, name: '发布文章', key: '/home/publish' },
].map((icon, index) => {
  const key = String(index + 1)

  return {
    key: `${icon.key}`,
    icon: React.createElement(icon.icon),
    label: `${icon.name}`,
  }
})
export default class LayoutComponent extends Component {
  state = {
    profile: {},
  }
  onConfirm = () => {
    console.log('点击了确定按钮')
    removeToken()
    this.props.history.push('/login')
    message.success('退出成功')
  }
  handleMenu = ({ item, key, keyPath, domEvent }) => {
    console.log(item, key, keyPath, domEvent)
    switch (key) {
      case '/home':
        this.props.history.push('/home')
        break
      case '/home/list':
        this.props.history.push('/home/list')
        break
      case '/home/publish':
        this.props.history.push('/home/publish')
        break
      default:
        break
    }
  }
  async componentDidMount() {
    const res = await getUserProfile()
    this.setState({
      profile: res.data,
    })
    console.log(res)
  }

  render() {
    let selectKey = this.props.location.pathname
    if (selectKey.includes('/home/publish')) {
      selectKey = '/home/publish'
    }
    console.log(history)
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>{this.state.profile.name}</span>
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
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[selectKey]}
                selectedKeys={[selectKey]}
                style={{ height: '100%', borderRight: 0 }}
                items={items2}
                onClick={this.handleMenu}
              />
            </Sider>
            <Layout style={{ padding: '24px', overflow: 'auto' }}>
              <Content className="site-layout-background">
                <Switch>
                  <Route path="/home" component={Home} exact></Route>
                  <Route path="/home/list" component={ArticleList}></Route>
                  <Route
                    exact
                    path="/home/publish"
                    component={ArticlePublish}
                    key="add"
                  ></Route>
                  <Route
                    path="/home/publish/:id"
                    component={ArticlePublish}
                    key="edit"
                  ></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
