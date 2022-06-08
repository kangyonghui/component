import React from 'react';
import {Select} from 'antd';
import axios from 'axios';

const style = {
  minWidth: '150px',
  margin: '0 20px 30px 20px'
};
class CascadeSelectItem extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    if (this.props.noParam) {
      this.fetchData();
    }
  }
  componentWillReceiveProps(nextProps) {
    const {param} = nextProps;
    if (param !== this.props.param) {
      this.props.onChange(null);
      this.fetchData(param);
    }
  }

  fetchData(query = '') {
    if (query === null) {
      return;
    }
    axios({
      url: `${this.props.url}${query}`
    }).then((res) => {
      let data = res.data;
      if (this.props.format) {
        data = data.map(v => this.props.format(v));
      }
      this.setState({
        data
      });
    });
  }

  render() {
    const {param, noParam, placeholder} = this.props;
    if (!noParam && param === null) {
      return (<Select
        style={style}
        disabled />);
    }
    return (
      <Select
        style={style}
        placeholder={placeholder}
        onChange={this.props.onChange}
      >
        {this.state.data
          .map(v => <Select.Option key={v.objectid}>{v.name}</Select.Option>)}
      </Select>
    );
  }
}
export default CascadeSelectItem;
