import React, { Component } from 'react'
import { Button, DatePicker, Card } from 'antd'
import './index.css'
import logo from "../../assets/images/logo.png"
export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <Card
        className='login-container'
        >
         
         <img src={logo} className='login-logo'/>
         
        </Card>
      </div>
    )
  }
}
