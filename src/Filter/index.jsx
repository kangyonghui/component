import React from 'react';
import {Row, Col} from 'antd';
import Search from './Search';
import PropTypes from 'prop-types';

class TableFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      field: ''
    };
    this.doSearch = this.doSearch.bind(this);
    this.selectField = this.selectField.bind(this);
  }

  doSearch({keyword}) {
    const val = keyword;
    const {field} = this.state;
    if (val === '') {
      this.state.searchFilter = {};
    } else {
      this.state.searchFilter = {
        [field]: val
      };
    }
    this.props.doSearch(this.state.searchFilter);
  }

  selectField(val) {
    this.state.field = val;
  }

  render() {
    const {searchItems} = this.props;
    const blist = searchItems.map(v => ({
      name: v.name,
      value: v.field
    }));
    let span = 11;
    let offset = 12;
    if (this.props.size === 'full') {
      offset = 1;
      span = 23;
    }
    return (
      <Row style={{height: '40px'}}>
        <Col span={span} offset={offset}>
          <Search
            select selectOptions={blist} onSearch={this.doSearch}
            selectProps={{
              placeholder: '请选择筛选字段',
              onSelect: this.selectField,
              style: {width: '120px'}
            }}
          />
        </Col>
      </Row>
    );
  }
}

TableFilter.propTypes = {
  searchItems: PropTypes.array,
  doSearch: PropTypes.func
};
TableFilter.defaultProps = {};

export default TableFilter;
