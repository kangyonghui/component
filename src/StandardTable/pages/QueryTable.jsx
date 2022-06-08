/**
 * Created by neo on 2017/11/14.
 */

import React, {Component} from 'react';
import {Button, Input, Select, Row, Col, Form} from 'antd';

const FormItem = Form.Item;

import {Util, Divider, FormTable, PanelModal} from 'component';

const {RadioTableList} = FormTable;

import './style.less'

const searchLayout = {md: 8, sm: 24};

const modalStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -20%)',
    border: 'none',
    padding: 0,
    width: '900px'
  },
  contentLimit: {
    maxHeight: "500px",
    overflowY: "auto"
  }
};

// 此处仅为示例，可能会是action.
function getUserList(params) {
  return Util.ajaxPromise("http://localhost:8888/saas20/api/2017070701/Apartment/free/app/version/query", params, 'POST', 'json');
}

class QueryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }


  // table的列配置 example
  columns = [{
    title: 'APP',
    dataIndex: 'appName',
  },
    {
      title: '版本号',
      dataIndex: 'versionNo',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sort: true,
    },
    {
      title: '操作',
      render: (val, row) => (
        <div>
          <a onClick={this.handleDetailClick.bind(this, row)}>配置</a>
          <Divider type="vertical"/>
          <a>订阅警报</a>
        </div>
      ),
    },
  ]

  componentDidMount() {
    this.query();
  }


  handleDetailClick(row) {
    //
    console.log(row);
  }

  handleAdd = () => {
    this.detailInfo.setModal(true);
  }

  // 下面开始模板区域
  // 操作区域
  getFilterGroup = () => {
    return [
      {
        align: "right",
        action: <Button onClick={this.handleAdd} icon="plus" type="primary" size="large">新建</Button>
      }
    ]
  }

  // 默认展示条件
  getBasicCondition() {
    return (
      <Row gutter={16}>
        <Col {...searchLayout} >
          <FormItem label={`关键字`}>
            <Input
              size="large"
              maxLength="30"
              placeholder="渠道、管理中心或客房关键字"
            />
          </FormItem>
        </Col>
      </Row>
    )
  }

  // 高级隐藏条件
  getAdvancedCondition() {
    return (
      <Row gutter={16}>
        <Col {...searchLayout} >
          <FormItem label="打码">
            <Select
              placeholder="打码"
              allowClear={true}
            >
              <Option value={0}>未打码</Option>
              <Option value={1}>已打码</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    )
  }

  // 勾选回调
  handleItemSelect = (rows) => {
    this.setState({
      selectedRows: rows
    })
  }

  render() {
    return (
      <div>
        <RadioTableList
          columns={this.columns}
          rowKey="id"
          pagination={true}
          remote={true}
          filterGroup={this.getFilterGroup()}
          basicCondition={this.getBasicCondition()}
          advancedCondition={this.getAdvancedCondition()}
          requestAction={getUserList}
          onItemSelect={this.handleItemSelect}
        />
        <div>
          <PanelModal
            ref={ins => this.detailInfo = ins}
            title="详情"
            customStyles={modalStyles}
          >
            12312312
          </PanelModal>
        </div>
      </div>
    )
  }
}

export default QueryTable;
