import React, { Component } from 'react';
import { Card, Table, Button, Icon } from 'antd';
import './Category.css'
class Category extends Component {
  render() {
    const columns = [
      {
        title: '品类名称', // 第一列中的第一个显示的内容
        dataIndex: 'name',// 用来具体显示哪个(data中)键中的数据
        render: text => <a>{text}</a>,
      },
      {
        title: '操作', // 第一列中的第一个显示的内容
        dataIndex: 'content',// 用来具体显示哪个(data中)键中的数据
        render: text => {
          return(
            <div>
              <Button type="link">修改分类</Button>
              <Button type="link">删除分类</Button>
            </div>
          )
        }
      }

    ];
    
    const data = [
      {
        key: '1',
        name: '家居生活',
        //content: '修改分类 删除分类'
      },
      {
        key: '2',
        name: '家居生活2',
        //content: '修改分类 删除分类'
      },
      {
        key: '3',
        name: '家居生活3',
        //content: '修改分类 删除分类'
      },
      {
        key: '4',
        name: '家居生活4',
        //content: '修改分类 删除分类'
      },
    ];
    return (
      <Card title="分类列表" extra={<Button type="primary"><Icon type="plus" />分类列表</Button>}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: [
            '3',
            '6',
            '9',
            '12'
          ],
          defaultPageSize: 3
        }} 
      />
    </Card>
    );
  }
}

export default Category;