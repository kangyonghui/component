---
order: 0
title:
  zh-CN: 搜索
  en-US: Search
---


````jsx
import {Search} from 'component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: []
    }
  }

  doSearch = () => {
    //todo
  };
  
  selectField = (val) => {
    this.setState({field: val});
  };
  
  render() {
    const blist = [{name: '姓名', value: 'name'}, {name: '电话', value: 'phone'}, {name: '身份证号', value: 'passNo'}];
    return (
      <Search select selectOptions={blist} onSearch={this.doSearch}
        selectProps={{
        placeholder: '请选择筛选字段',
        onSelect: this.selectField,
        style: {width: '120px'}
        }}
      />
     );
  }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
