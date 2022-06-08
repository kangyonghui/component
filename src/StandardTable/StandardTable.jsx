/**
 * 基础的Table组件，内部使用react-bootstrap-table
 * 可以采用HOC(高阶组件)覆写功能
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import BootstrapTable from '../react-bootstrap-table';

const {TableHeaderColumn} = BootstrapTable;

class CommonTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    sorter: {
      field: "",
      order: "",
    },
    sizePerPage: 10,
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
      });
    }
  }

  renderTableColumns = (columns) => {

    return columns.map((item, index) => {
      return (
        <TableHeaderColumn
          width={item.width}
          dataField={item.dataIndex}
          tdStyle={item.tdStyle}
          dataAlign={item.align}
          dataSort={!!item.sort}
          dataFormat={item.render}
          key={index}
        >
          {item.title}
        </TableHeaderColumn>
      )
    })
  }

  // 分页变换
  onPageChange = (page, sizePerPage) => {
    this.setState({
      sizePerPage,
      current: page,
    });

    this.props.onChange({current: page, pageSize: sizePerPage}, {}, this.state.sorter);
  }

  onSortChange = (sortName, sortOrder) => {
    const sorter = {
      sortName,
      sortOrder,
    };

    this.setState({sorter});

    this.props.onChange({current: this.state.current, pageSize: this.state.sizePerPage}, {}, sorter);
  }

  // 选项配置 start
  onSelect = (row, isSelected) => {
    let {selectedRowKeys} = this.state;

    let rows = [...this.props.selectedRows];

    if (isSelected == true) {
      selectedRowKeys.push(row.id);
      rows.push(row);
    } else if (isSelected == false) {
      selectedRowKeys = selectedRowKeys.filter(item => item != row.id);
      rows = rows.filter(item => item.id != row.id);
    }

    if (this.props.onSelectRow) {
      this.props.onSelectRow(rows);
    }

    this.setState({selectedRowKeys});
  }

  onSelectAll = (isSelected, rows) => {
    let resultRows = [];

    if (isSelected)
      resultRows = rows;

    if (this.props.onSelectRow) {
      this.props.onSelectRow(resultRows);
    }

    const selectedRowKeys = resultRows.map(item => item[this.props.rowKey]);

    this.setState({selectedRowKeys});
  }

  getSelectRow() {
    return {
      mode: "checkbox",
      clickToSelect: true,
      onSelect: this.onSelect,
      onSelectAll: this.onSelectAll,
      selected: this.state.selectedRowKeys,
      unselectable: this.props.unselectable
    };
  }

  // 选项配置 end

  render() {
    const {selectedRowKeys} = this.state;
    const {data: {list, totalCount, currentPage}, columns, pagination, remote, noDataText} = this.props;

    return (
      <div className="standardTable">
        <BootstrapTable
          id="table-load"
          data={list}
          keyField="id"
          pagination={pagination}
          remote={remote}
          selectRow={this.getSelectRow()}
          options={{
            noDataText,
            page: currentPage,
            sizePerPage: this.state.sizePerPage,
            onPageChange: this.onPageChange,
            onSortChange: this.onSortChange,
            defaultSortName: this.state.sorter.field,
            defaultSortOrder: this.state.sorter.order
          }}
          fetchInfo={{
            dataTotalSize: totalCount
          }}
        >
          {this.renderTableColumns(columns)}
        </BootstrapTable>
      </div>
    );
  }
}

CommonTable.propTypes = {
  onChange: PropTypes.func,
  data: PropTypes.object,
  columns: PropTypes.array,
  rowSelection: PropTypes.object,
  pagination: PropTypes.bool,
  remote: PropTypes.bool,
  onSelectRow: PropTypes.func,
  rowKey: PropTypes.string,
  unselectable: PropTypes.array,
};

CommonTable.defaultProps = {
  pagination: false,
  remote: false,
  selectedRows: [],
};

export default CommonTable;
