---
order: 2
title:
  zh-CN: 点击事件
  en-US: radio button
---


````jsx
import {RadioButton} from 'component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ''
    };
  }
 handleAuthClick = (type, e) => {
     let result = "";
     if (type !== this.state.type)
       result = type;
     this.setState({type: result}, () => {alert(e.name)})
  };
 render() {
      const options = [{
       key: '1',
       text: '已认证'
      },
       {
         key: '0',
         text: '未认证'
       }];
    return (
       <RadioButton onChange={this.handleAuthClick} options={options}/>
    );
 }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
