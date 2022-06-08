import { Input, Select, Button } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Search extends React.Component {
  state = {
    clearVisible: false,
    // selectData: '',
    selectValue: (this.props.select && this.props.selectProps) ? this.props.selectProps.defaultValue : '',
  }
  handleSearch = () => {
    const data = {
      keyword: ReactDOM.findDOMNode(this.searchInput).value,
    };
    if (this.props.select) {
      data.field = this.state.selectValue;
    }
    if (this.props.onSearch) this.props.onSearch(data);
  }
  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      clearVisible: e.target.value !== '',
    });
  }
  handeleSelectChange = (value) => {
    this.setState({
      ...this.state,
      selectValue: value,
    });
  }
  handleFormReset = () => {
    ReactDOM.findDOMNode(this.searchInput).value = '';
    const data = {
      keyword: '',
    };
    // this.setState({
    //   selectData: '请选择',
    // });
    if (this.props.select) {
      data.field = '';
    }
    if (this.props.onSearch) this.props.onSearch(data);
  }
  render() {
    const { size, select, selectOptions, selectProps, style, keyword } = this.props;
    const { clearVisible } = this.state;
    return (
      <Input.Group compact size={size} className="search" style={style}>
        {select && <Select ref={searchSelect => this.searchSelect = searchSelect} onChange={this.handeleSelectChange} size={size} {...selectProps}>
          {/*<Select.Option value={this.state.selectData}>请选择筛选字段</Select.Option>*/}
            {selectOptions && selectOptions.map((item, key) =>
              <Select.Option value={item.value} key={key}>{item.name || item.value}</Select.Option>)}
          </Select>}
        <Input
          ref={searchInput => this.searchInput = searchInput}
          size={size}
          onChange={this.handleInputChange}
          onPressEnter={this.handleSearch}
          defaultValue={keyword} />
        <Button size={size} type="primary" style={{ marginRight: '3px'}} onClick={this.handleSearch}>搜索</Button>
        {/*<Button type="primary" onClick={this.handleFormReset}>重置</Button>*/}
      </Input.Group>
    );
  }
}


// Search.propTypes = {
//   size: PropTypes.string,
//   select: PropTypes.bool,
//   selectProps: PropTypes.object,
//   onSearch: PropTypes.func,
//   selectOptions: PropTypes.array,
//   style: PropTypes.object,
//   keyword: PropTypes.string,
// };

export default Search;
