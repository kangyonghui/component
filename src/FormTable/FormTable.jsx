import React, {Component} from 'react';
import PropTypes from 'prop-types';

import FormFilter, {Condition, AdvancedCondition} from '../FormFilter';

import TableFilter, {FilterItem} from '../TableFilter';

import BasicTable from '../StandardTable/hoc/BasicTable';

import './index.less';

class FormTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageList: {
        currentPage: 1,
        list: [],
        totalCount: 0,
        totalPage: 0
      },
      selectedRows: [],
      pageSize: 10,
      sorter: {
        field: "",
        order: "",
      },
    }
  }

  componentDidMount() {
    if (this.props.pageList) {
      this.setState({pageList: this.props.pageList});
    } else {
      this.query();
    }
  }

  // 构造请求参数(分页信息等参数这边不需要)
  getBasicQuery = () => {
    return this.props.requestParams || {};
  };

  makeRequest(params) {
    const {requestAction} = this.props;

    requestAction(params).then(result => {
      if (result.errorCode == 0 && result.data && result.data.list)
        this.setState({pageList: result.data});
      else
        this.setState({
          pageList: {
            currentPage: 1,
            list: [],
            totalCount: 0,
            totalPage: 0
          }
        })
    });
  }

  // 构造查询的核心部分，把分页、排序参数和基本参数合并
  query = (page = 1) => {
    const params = this.getBasicQuery();

    const {pageSize, sorter} = this.state;

    params.page = page;
    params.pageSize = pageSize;
    params.orderBy = this.props.requestParams.orderBy || [sorter.field, sorter.order].join(" ");

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        if (!params[key])
          delete params[key];
      }
    }

    this.makeRequest(params);
  }

  // 下层Table的变动回调，包含分页，排序
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sorter,
      pageSize: pagination.pageSize,
    }, () => {
      this.query(pagination.current);
    })
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });

    this.props.onItemSelect && this.props.onItemSelect(rows);
  }

  onSearchClick = () => {
    this.query();
  }

  renderFilter(filter) {
    return filter.map((item, i) => {
      return (
        <FilterItem float={item.align} key={i}>
          {item.action}
        </FilterItem>
      )
    })
  }

  render() {
    const {
      columns, pagination, remote, rowKey, filterGroup,
      basicCondition,
      advancedCondition,
      noDataText
    } = this.props;

    const hasForm = basicCondition || advancedCondition;

    return (
      <div>
        {
          hasForm ? (<FormFilter
            onSubmit={this.onSearchClick}
            className="tableListForm"
          >
            <Condition>
              {basicCondition}
            </Condition>
            {advancedCondition ? (<AdvancedCondition>{advancedCondition}</AdvancedCondition>) : null}
          </FormFilter>) : null
        }
        {
          filterGroup ? (
            <TableFilter>
              {this.renderFilter(filterGroup)}
            </TableFilter>
          ) : null
        }
        <BasicTable
          columns={columns}
          noDataText={noDataText}
          data={this.state.pageList}
          onChange={this.handleChange}
          onSelectRow={this.handleSelectRows}
          rowKey={rowKey}
          pagination={pagination}
          remote={remote}
        />
      </div>
    )
  }
}

FormTable.propTypes = {
  columns: PropTypes.array,
  rowKey: PropTypes.string,
  pagination: PropTypes.bool,
  remote: PropTypes.bool,
  filterGroup: PropTypes.array,
  basicCondition: PropTypes.node,
  advancedCondition: PropTypes.element,
  onItemSelect: PropTypes.func,
  requestParams: PropTypes.object,
};

FormTable.defaultProps = {
  advancedCondition: null,
  pagination: false,
  requestParams: {},
};

export default FormTable;
