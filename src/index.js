import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import './index.css'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/locale/zh_CN'
ReactDOM.render(
  <ConfigProvider locale={locale}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
)
