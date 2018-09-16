import React from 'react'
import Dashboard from '../../antd'
import { Table } from 'antd'

const columns = [
  { title: '序号', dataIndex: 'key', key: 'id' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '排序', dataIndex: 'sort', key: 'address' },
  { title: '操作', dataIndex: '', key: 'x', render: () => <a href="javascript:;">添加子分类</a> },
]

const data = [
  { key: 1, name: '披萨', age: 32, sort: 1, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 2, name: '牛排', age: 42, sort: 2, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
  { key: 3, name: '沙拉', age: 32, sort: 3,  address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
]

export default class ApiPage extends React.Component {
  render () {
    return (
      <Dashboard>
        <Table
          columns={columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
          dataSource={data}
        />
      </Dashboard>
    )
  }
}