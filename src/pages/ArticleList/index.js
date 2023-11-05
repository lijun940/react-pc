import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import {
  ArticleStatus,
  ArticleStatusMap,
  ArticleStatusColorMap,
} from 'api/constants'
import {
  Card,
  Breadcrumb,
  Table,
  DatePicker,
  Form,
  Radio,
  Button,
  Select,
  Tag,
  Space,
  Image,
  Modal,
  message,
} from 'antd'
import { getChannels } from 'api/channel'
import { delArticle, getArticles } from 'api/article'
import defaultImage from 'assets/images/defaultImage.png'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import Channel from 'components/Channel'
const { RangePicker } = DatePicker
export default class ArticleList extends Component {
  columns = [
    {
      title: '封面',
      render: (row) =>
        row.cover.images.length ? (
          <Image.PreviewGroup>
            {row.cover.images.map((item) => (
              <Image src={item} width="200px" height="120px" />
            ))}
          </Image.PreviewGroup>
        ) : (
          <Image src={defaultImage} width="200px" height="120px" />
        ),
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(data) {
        return (
          <Tag color={ArticleStatusColorMap[data]}>
            {ArticleStatusMap[data]}
          </Tag>
        )
      },
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <>
            <Space>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => this.handleEdit(data)}
              />
              <Button
                type="primary"
                shape="circle"
                danger
                icon={<DeleteOutlined />}
                onClick={() => this.handleDelete(data.id)}
              />
            </Space>
          </>
        )
      },
    },
  ]
  reqParams = {
    page: 1,
    per_page: 10,
  }
  render() {
    const { channels, articles } = this.state
    const { total_count, results, per_page, page } = articles
    return (
      <div className={styles.list}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>文章列表</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                {ArticleStatus.map((item) => {
                  return (
                    <Radio key={item.id} value={item.id}>
                      {item.name}
                    </Radio>
                  )
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="频道" name="channel_id">
              <Channel />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                筛选
              </Button>
            </Form.Item>
            <Form.Item label="日期" name="date">
              <RangePicker />
            </Form.Item>
          </Form>
        </Card>
        <Card title={`根据筛选条件，共找到${total_count}条结果`}>
          <Table
            pagination={{
              position: ['bottomCenter'],
              total: total_count,
              pageSize: per_page,
              current: page,
              onChange: this.onChange,
            }}
            rowKey="id"
            columns={this.columns}
            dataSource={results}
          />
        </Card>
      </div>
    )
  }
  state = {
    channels: [],
    articles: {},
  }
  handleEdit = (data) => {
    this.props.history.push(`/home/publish/${data.id}`, data)
  }

  handleDelete = (id) => {
    console.log('删除', id)
    Modal.confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: '你确定要删除文章么',
      okText: '确认',
      onOk: async () => {
        const res = await delArticle(id)
        this.getArticleList()
        message.success('删除成功')
        console.log(res)
      },
      cancelText: '取消',
    })
  }

  onChange = (page, pageSize) => {
    this.reqParams.page = page
    this.reqParams.per_page = pageSize
    this.getArticleList()
  }

  getChannelList = async () => {
    const res = await getChannels()
    this.setState({
      channels: res.data.channels,
    })
  }
  getArticleList = async () => {
    const res = await getArticles(this.reqParams)
    this.setState({
      articles: res.data,
    })
  }

  async componentDidMount() {
    this.getChannelList()
    this.getArticleList()
  }
  onFinish = ({ status, channel_id, date }) => {
    if (status !== -1) {
      this.reqParams.status = status
    } else {
      delete this.reqParams.status
    }
    if (channel_id !== undefined) {
      this.reqParams.channel_id = channel_id
    } else {
      delete this.reqParams.channel_id
    }
    if (date) {
      this.reqParams.begin_pubdate = date[0]
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
      this.reqParams.end_pubdate = date[1]
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
    } else {
      delete this.reqParams.begin_pubdate
      delete this.reqParams.end_pubdate
    }
    this.reqParams.page = 1
    this.getArticleList()
  }
}
