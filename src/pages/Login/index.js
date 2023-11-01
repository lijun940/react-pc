import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message, Card } from "antd";

import "./index.scss";
import logo from "../../assets/images/logo.png";
export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <Card className="login-container">
          <Form className="login-form" size="large">
            <Form.Item
              name="mobile"
              // 配置表单校验规则
              rules={[
                // required 表示表单项为必填项
                { required: true, message: "请输入手机号码" },
                // 注意：此处的配置，仅仅是给出一个校验，不会限制输入的长度
                // { max: 11, message: '手机号码格式不正确' },
                // len 表示这一项的长度
                // message 表示该校验规则失败时，展示给用户的提示
                // { len: 11, message: '手机号码长度为11位' },
                { pattern: /^1[3-9]\d{9}$/, message: "手机号码格式不正确" },
              ]}
            >
              {/* maxLength 限制文本框中输入内容的长度 */}
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: "请输入验证码" },
                {
                  pattern: /^\d{6}$/,
                  message: "请输入正确的验证码",
                },
              ]}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>
            {/* 注意：Form.Item 配合 表单元素 来使用时，应该 一个 Form.Item 只能有一个唯一的表单元素子节点 */}
            {/* <Form.Item> */}
            {/* 
            Form.Item 中有一个属性叫做 noStyle 表示不添加样式
            去掉 noStyle 表示默认是有样式的
          */}
            <Form.Item
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator(rule, value) {
                    if (value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(new Error("请阅读"));
                    }
                  },
                },
              ]}
            >
              <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
            </Form.Item>
            {/* </Form.Item> */}

            <Form.Item>
              {/* 注意：该 按钮 的类型为 submit，所以，才可以触发表单的校验、提交 */}
              {/* 是通过 htmlType="submit" 属性来指定的 */}
              <Button
                block
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登 录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
