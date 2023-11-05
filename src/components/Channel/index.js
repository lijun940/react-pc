import React, { Component } from 'react'
import { Select } from 'antd'
import { getChannels } from 'api/channel'
export default class Channel extends Component {
  state = {
    channels: [],
  }
  getChannelList = async () => {
    const res = await getChannels()
    this.setState({
      channels: res.data.channels,
    })
  }
  async componentDidMount() {
    this.getChannelList()
  }
  render() {
    const { channels } = this.state
    const { value, onChange } = this.props
    return (
      <div>
        <Select
          allowClear
          placeholder="请选择文章频道"
          value={value}
          onChange={onChange}
          style={{ width: 200 }}
          options={channels.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />
      </div>
    )
  }
}
