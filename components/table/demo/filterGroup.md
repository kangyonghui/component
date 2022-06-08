---
order: 1
title:
  zh-CN: 自定义查询
  en-US: radio button
---


````jsx
import {Select, Input, Button, Form, Row, Col} from 'antd';
import {Table} from 'component';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceType: '',
      type: 0
    };
  }

  getColumns = () => {
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '分组名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '设备类别',
      dataIndex: 'deviceTypeName',
      key: 'deviceTypeName',
    },
    {
      title: '所选设备名称',
      dataIndex: 'devices',
      key: 'devices'
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    }];
    return columns;
  };

  getFilterGroup = () => [
    {
      align: 'right',
      action: <Button onClick={this.add} type="primary" size="large">新增</Button>
    },
    {
      align: 'right',
      action: <Button onClick={this.handleQuery} type="primary" size="large">查询</Button>
    }
  ];

  handleQuery= () => {
    this.table.query();
  };

  add= () => {
    this.table.query();
  };

  handleWordChange = (key, e) => {
    if (e) {
      this.setState({[key]: e.target ? e.target.value : e});
    } else {
      this.setState({[key]: e});
    }
  };

  getBasicCondition = () => {
    const {deviceType, type} = this.state;
    return (
      <Row>
        <Col span={12}>
          <FormItem {...formItemLayout} label={'分组/标签'}>
            <Select value={type} onChange={this.handleWordChange.bind(this, 'type')} style={{width: 240}}>
              <Option value={0}>分组</Option>
              <Option value={1}>标签</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...formItemLayout} label={'设备类别'}>
            <Input value={deviceType} onChange={this.handleWordChange.bind(this, 'deviceType')}/>
          </FormItem>
        </Col>
      </Row>
    );
  };

  getList = (params) => {
    console.log(params);
  };

  render() {
    const {deviceType, type} = this.state;
    //接口不通，这里模拟数据
    const dataSource = [{
      id: 1,
      name: '1',
      description: '1',
      devices: '1',
      deviceTypeName: '1'
     }, {
      id: 2,
      name: '2',
      description: '2',
      devices: '2',
      deviceTypeName: '2'
    }];
    return (
      <Table
        ref={(table) => {
          this.table = table;
        }}
        dataSource={dataSource}
        requestParams={{deviceType, type}}
        dataRequest={this.getList}
        columns={this.getColumns()}
        basicCondition={this.getBasicCondition()}
        filterGroup={this.getFilterGroup()}
      />
    );
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
