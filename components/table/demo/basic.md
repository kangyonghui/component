---
order: 0
title:
  zh-CN: 基本用法
  en-US: table
---


````jsx
import {Button} from 'antd';
import {Table, DeleteButton} from 'component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {}
    };
  }

  filterTable = (filter) => {
    this.setState({filter}, () => {
      this.table.query();
    });
  };

  handleEdit = (id) => {
    console.log(id);
  };

  handleDelete = (id) => {
    console.log(id);
  };

  getColumns = () => {
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '策略名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'operate',
      render: (text, record) => (
        <div>
          <Button icon="edit" onClick={this.handleEdit.bind(this, text)} style={{marginRight: '10px'}}>编辑</Button>
          <DeleteButton onClick={this.handleDelete.bind(this, text)}>删除</DeleteButton>
        </div>
        )
    }];
    return columns;
  };

  getList = (params) => {
    console.log(params);
  };

  render() {
    const {filter} = this.state;
    //接口不通，这里模拟数据
    const dataSource = [{
      id: 1,
      name: '1',
      description: '1'
      }, {
      id: 2,
      name: '2',
      description: '2'
     }];
    return (
       <Table
         ref={(table) => {
           this.table = table;
         }}
         dataSource={dataSource}
         requestParams={{...filter}}
         dataRequest={this.getList}
         columns={this.getColumns()}
       />
    );
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
