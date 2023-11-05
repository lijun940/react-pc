import React, { Component } from 'react'
import styles from './index.module.scss'
import {
  Card,
  Select,
  Breadcrumb,
  Button,
  Form,
  Space,
  Input,
  Radio,
  Upload,
  Modal,
  message,
} from 'antd'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { ArticleImg } from 'api/constants'
import { PlusOutlined } from '@ant-design/icons'
import { baseURL } from 'utils/request'
import { addArticle, updateArticle } from 'api/article'
export default class ArticlePublish extends Component {
  formRef = React.createRef()
  state = {
    type: 0,
    fileList: [],
    showPreview: false,
    preViewUrl: '',
    id: this.props.match.params.id,
  }
  componentDidMount() {
    const data = this.props.location.state
    console.log(data)
    const values = {
      ...data,
    }
    if (data) {
      this.formRef.current.setFieldsValue(values)
      this.setState({
        fileList: data?.cover?.images?.map((item) => ({
          url: item,
        })),
        type: +data?.cover?.type,
      })
    }
  }
  render() {
    const { type, fileList, showPreview, preViewUrl, id } = this.state
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{id ? '编辑' : '发布'}文章</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            ref={this.formRef}
            labelCol={{ span: 4 }}
            onFinish={this.onFinish}
            validateTrigger={['onBlur', 'onChange']}
            initialValues={{
              title: '哈哈哈',
              channel_id: 0,
              content: '',
              type,
            }}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '文章的标题不能为空',
                },
              ]}
            >
              <Input
                style={{ width: 400 }}
                placeholder="请输入文章的标题"
              ></Input>
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[
                {
                  required: true,
                  message: '请选择频道',
                },
              ]}
            >
              <Channel style={{ width: 400 }}></Channel>
            </Form.Item>
            <Form.Item label="封面" name="type">
              <Radio.Group onChange={this.changeType}>
                {ArticleImg.map((item) => {
                  return (
                    <Radio key={item.id} value={item.id}>
                      {item.name}
                    </Radio>
                  )
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              {type !== 0 && (
                <Upload
                  name="image"
                  action={`${baseURL}upload`}
                  listType="picture-card"
                  fileList={fileList}
                  onChange={this.uploadImage}
                  onPreview={this.handlePreview}
                  beforeUpload={this.beforeUpload}
                >
                  {fileList.length < type && (
                    <>
                      <PlusOutlined></PlusOutlined>上传
                    </>
                  )}
                </Upload>
              )}
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[
                {
                  required: true,
                  message: '请输入文章的内容',
                },
              ]}
            >
              <ReactQuill theme="snow" placeholder="请输入文章的内容" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  {id ? '编辑' : '发布'}文章
                </Button>
                <Button size="large" onClick={this.addDraft}>
                  存入草稿
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Modal
          open={showPreview}
          title={'预览'}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={preViewUrl} />
        </Modal>
      </div>
    )
  }
  save = async (values, draft) => {
    const { fileList, type } = this.state
    if (fileList.length !== type) {
      return message.warn('上传的图片数量不正确')
    }
    const images = fileList.map((item) => item.url || item.response.data.url)
    if (this.state) {
      await updateArticle(
        {
          ...values,
          cover: {
            type,
            images,
          },
          id: this.state.id,
        },
        draft
      )
      message.success('修改成功')
    } else {
      await addArticle(
        {
          ...values,
          cover: {
            type,
            images,
          },
        },
        draft
      )
      message.success('添加成功')
    }

    this.props.history.push('/home/list')
  }

  onFinish = async (data) => {
    this.save(data, false)
  }
  handleCancel = () => {
    this.setState({
      showPreview: false,
      preViewUrl: '',
    })
  }

  uploadImage = ({ file, fileList }) => {
    this.setState({
      fileList,
    })
  }
  addDraft = async () => {
    const res = await this.formRef.current.validateFields()
    this.save(res, true)
  }

  beforeUpload = (file) => {
    console.log(file)
    if (file.size >= 1024 * 500) {
      message.warn('不超过500kb')
      return Upload.LIST_IGNORE
    }
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.warn('只能上传jpg或png的图片')
      return Upload.LIST_IGNORE
    }
    return true
  }

  handlePreview = (file) => {
    console.log(file)
    const preViewUrl = file.url || file.response.data.url
    this.setState({
      showPreview: true,
      preViewUrl,
    })
  }

  changeType = (e) => {
    this.setState({
      type: e.target.value,
      fileList: [],
    })
  }
}
