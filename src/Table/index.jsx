import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table, message} from 'antd';

class FormTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pagination: {...this.props.pagination, showSizeChanger: true, showQuickJumper: true},
      dataSource: this.props.dataSource
    };
  }

  componentDidMount() {
    if (!this.state.dataSource.length) {
      this.query();
    }
  }

  makeRequest = (params) => {
    const {dataRequest} = this.props;
    const {pagination} = this.state;
    const _this = this;
    _this.setState({
      loading: true
    }, () => {
      dataRequest(params).then((result) => {
        if (result.data.code === 0 && result.data.data && result.data.data.list) {
          pagination.current = params.pageNo;
          pagination.pageSize = params.pageSize;
          pagination.total = result.data.data.total;
          _this.setState({dataSource: result.data.data.list, pagination, loading: false});
        } else {
          _this.setState({
            pagination: {
              total: 0,
              pageSize: params.pageSize || 10,
              current: 1,
              showTotal: total => `共${total}条`
            },
            dataSource: [],
            loading: false
          });
        }
      }).catch((error) => {
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          message.error(error.message);
        }
        message.error(error.config);
        _this.setState({
          pagination: {
            total: 0,
            pageSize: params.pageSize || 10,
            current: 1,
            showTotal: total => `共${total}条`
          },
          dataSource: [],
          loading: false
        });
      });
    });
  };

  query = (page = 1, pageSize) => {
    const {pagination} = this.state;
    const params = this.props.requestParams || {};
    params.pageNo = page;
    params.pageSize = pageSize  || pagination.pageSize || 10;
    for (var key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        if (params[key] instanceof Array) {
          if (params[key].toString() === '[]') {
            delete params[key];
          }
        } else if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      }
    }
    this.makeRequest(params);
  };

  handleChange = (val) => {
    const {pagination} = this.state;
    pagination.current = val.current;
    pagination.pageSize = val.pageSize;
    this.setState({pagination}, () => {
      this.query(val.current, val.pageSize);
    });
  };

  renderFilter = filter => filter.map((item, i) => (
    <div key={i} style={{float: item.align, margin: '0 10px'}}>
      {item.action}
    </div>
  ));

  render() {
    const {
      columns,
      basicCondition,
      className,
      style,
      rowKey,
      showHeader,
      size,
      title,
      rowSelection,
      filterGroup,
      ...others
    } = this.props;
    const {loading, pagination, dataSource} = this.state;
    const hasForm = basicCondition;
    return (
      <div style={{background: 'white', paddingTop: '20px'}}>
        {
          hasForm ? (basicCondition) : null
        }
        {
          filterGroup ? (
            <div style={{overflow: 'hidden', marginBottom: '10px'}}>
              {this.renderFilter(filterGroup)}
            </div>
          ) : null
        }
        <Table
          {...others}
          columns={columns}
          dataSource={dataSource}
          className={className}
          loading={loading}
          showHeader={showHeader}
          size={size}
          title={title}
          style={style}
          onChange={this.handleChange}
          rowSelection={rowSelection}
          rowKey={rowKey}
          pagination={pagination}
        />
      </div>
    );
  }
}

FormTable.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  rowKey: PropTypes.string,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  filterGroup: PropTypes.array,
  basicCondition: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.bool,
  showHeader: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
  rowSelection: PropTypes.object,
  dataRequest: PropTypes.func,
  requestParams: PropTypes.object
};

FormTable.defaultProps = {
  pagination: {
    total: 0,
    pageSize: 10,
    current: 1,
    showTotal: total => `共${total}条`
  },
  rowSelection: null,
  dataSource: [],
  rowKey: 'key',
  showHeader: true,
  size: 'default',
  requestParams: {}
};

export default FormTable;
