---
order: 0
title:
  zh-CN: 基本用法
  en-US: radio button
---


````jsx
import {RadioButton} from 'component';

class App extends React.Component {
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
       <RadioButton activeKey="1" options={options}/>
    );
 }
}

ReactDOM.render(
  <App/>,
  mountNode
);
````
